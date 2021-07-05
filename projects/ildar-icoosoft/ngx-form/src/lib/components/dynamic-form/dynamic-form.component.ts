import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { UnsubscribeService } from 'ii-ngx-common';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { cloneDeep as _cloneDeep, uniqBy as _uniqBy } from 'lodash';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';
import { getFieldValidators, getGroupValidators } from '../../utils/dynamic-form';
import { markAllFormControlsAsTouched, setFormErrors } from '../../utils/error';
import {
  ControlChangeData,
  DynamicField,
  DynamicForm,
  DynamicFormButton,
  DynamicFormDependency,
  FormError,
  FormSubmitEvent,
  NgxFormModuleConfig,
} from '../../types';
import { DynamicFormComponentType } from '../../types/dynamic-form-component-type';
// короткий путь .. использовать нельзя, т.к. возникает циклическая зависимость
import { FieldComponent } from '../field/field.component';
import { FieldComponentType } from '../../types/field-component-type';

@Component({
  selector: 'ii-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements DynamicFormComponentType, OnInit, AfterViewInit {
  formDataWithDependencies!: DynamicForm;

  @Input() formData!: DynamicForm;

  @Input() formCssClass = '';

  @Input() initialValues: Record<string, unknown> = {};

  @Input() showButtons = true;

  @Input() buttons: DynamicFormButton[] = [
    {
      label: 'Submit',
      onClick: () => this.validateAndSubmit(),
    },
  ];

  @Output() submitForm: EventEmitter<FormSubmitEvent> = new EventEmitter();

  @Output() loadForm: EventEmitter<DynamicFormComponent> = new EventEmitter();

  @Output() groupChange: EventEmitter<Record<string, any>> = new EventEmitter();

  @Output() controlChange: EventEmitter<ControlChangeData> = new EventEmitter();

  group!: FormGroup;

  isSubmitting = false;

  @ViewChildren(FieldComponent) fieldComponents!: QueryList<FieldComponent>;

  constructor(
    @Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig,
    private ngUnsubscribe$: UnsubscribeService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngAfterViewInit(): void {
    this.loadForm.emit(this);
  }

  ngOnInit(): void {
    this.formDataWithDependencies = this.applyDependencies(this.formData, this.initialValues);
    this.group = this.initGroup(this.formDataWithDependencies, this.initialValues);

    this.watchForDependenciesChange(this.formDataWithDependencies, this.group);

    const groupValidators: ValidatorFn[] = getGroupValidators(this.formData, this.config);

    this.group.setValidators(groupValidators);

    this.group.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((values) => this.groupChange.emit(values));
  }

  trackByField(index: number, field: DynamicField): string {
    return field.name;
  }

  private watchForDependenciesChange(formData: DynamicForm, formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const formControl = formGroup.get(controlName) as FormControl;

      formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        if (formData.dependencies?.[controlName]) {
          const groupValues = formGroup.getRawValue();

          this.formDataWithDependencies = this.applyDependencies(this.formData, groupValues);
          this.group = this.initGroup(this.formDataWithDependencies, groupValues);
          this.watchForDependenciesChange(this.formDataWithDependencies, this.group);
        }
      });
    });
  }

  private applyDependencies(formData: DynamicForm, values: Record<string, unknown>): DynamicForm {
    const formDataWithDependencies: DynamicForm = _cloneDeep(formData);

    if (formData.dependencies) {
      const dependencies = formData.dependencies as Record<string, DynamicFormDependency[]>;

      Object.keys(dependencies).forEach((fieldName) => {
        if (dependencies[fieldName]) {
          dependencies[fieldName].forEach((dependency) => {
            if (
              dependency.condition.type === 'oneOf' &&
              dependency.condition.value.includes(values[fieldName])
            ) {
              this.mergeSchemas(formDataWithDependencies, dependency.subschema);
            }
          });
        }
      });
    }

    return formDataWithDependencies;
  }

  private initGroup(formData: DynamicForm, values: Record<string, unknown>): FormGroup {
    const group = new FormGroup({});

    this.formDataWithDependencies.items.forEach((item: DynamicField) => {
      const validators: ValidatorFn[] = getFieldValidators(item, this.config);

      const value = values[item.name] === undefined ? item.default : values[item.name];

      const formControl = new FormControl(value, validators);

      formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((controlValue) => {
        this.controlChange.emit({
          name: item.name,
          formControl,
          value: controlValue,
        });
      });

      group.addControl(item.name, formControl);
    });

    return group;
  }

  private mergeSchemas(
    schema: Pick<DynamicField, 'items'>,
    subschema: Pick<DynamicField, 'items'>,
  ): void {
    // eslint-disable-next-line no-param-reassign
    schema.items = _uniqBy([...(schema.items || []), ...(subschema.items || [])], 'name');
  }

  getGroup(): FormGroup {
    return this.group;
  }

  getRawValues(): any {
    return this.group.getRawValue();
  }

  getValues(): any {
    return this.group.value;
  }

  getFormControl(name: string): AbstractControl {
    if (!this.group.controls[name]) {
      throw Error(`form control ${name} not found`);
    }

    return this.group.controls[name];
  }

  getFormElement(name: string): Component & ControlValueAccessor {
    return this.getField(name).getFormElement();
  }

  getField(name: string): FieldComponentType {
    const arr = this.fieldComponents.toArray();

    const fieldComponent = arr.find((item) => item.fieldData.name === name);
    if (!fieldComponent) {
      throw Error(`field ${name} not found`);
    }

    return fieldComponent;
  }

  onButtonClick(button: DynamicFormButton, event: Event): void {
    event.preventDefault();

    button.onClick({
      form: this,
      nativeEvent: event,
    });
  }

  validateAndSubmit(): void {
    if (this.isSubmitting) {
      return;
    }
    if (this.group.invalid) {
      markAllFormControlsAsTouched(this.group);
      return;
    }

    const formData: any = this.group.getRawValue();

    this.isSubmitting = true;
    this.submitForm.emit({
      values: formData,
      setSubmitting: (isSubmitting: boolean) => this.setSubmitting(isSubmitting),
      setErrors: (errors: FormError[]) => this.setErrors(errors),
    });
  }

  setErrors(formErrors: FormError[]): void {
    setFormErrors(this.group, formErrors);
    this.isSubmitting = false;

    this.changeDetectorRef.markForCheck();
  }

  setSubmitting(isSubmitting: boolean): void {
    this.isSubmitting = isSubmitting;

    this.changeDetectorRef.markForCheck();
  }

  setValues(values: Record<string, any>): void {
    this.group.setValue(values);

    this.changeDetectorRef.markForCheck();
  }

  patchValues(values: Record<string, any>): void {
    this.group.patchValue(values);

    this.changeDetectorRef.markForCheck();
  }
}
