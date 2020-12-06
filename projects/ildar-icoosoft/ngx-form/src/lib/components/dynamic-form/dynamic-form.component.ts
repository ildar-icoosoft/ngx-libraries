import {AfterViewInit, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {DynamicFormData} from '../../interfaces/dynamic-form-data';
import {FormSubmitData} from '../../interfaces/form-submit-data';
import {ControlChangeData} from '../../interfaces/control-change-data';
import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {DynamicFormButton} from '../../interfaces/dynamic-form-button';
import {Subject} from 'rxjs';
import {NGX_FORM_MODULE_CONFIG} from '../../constants/ngx-form-module-config';
import {NgxFormModuleConfig} from '../../interfaces/ngx-form-module-config';
import {DynamicFieldDirective} from '../../directives/dynamic-field.directive';
import {DynamicFieldData} from '../../interfaces/dynamic-field-data';
import {getFieldDataOptionValue, getGroupValidators, getValidators, needToShowLabelOutside} from '../../utils/dynamic-form';
import {takeUntil} from 'rxjs/operators';
import {DynamicFieldDataOption} from '../../interfaces/dynamic-field-data-option';
import {markAllFormControlsAsTouched, setFormErrors} from '../../utils/error';
import {FormError} from '../../interfaces/form-error';

@Component({
  selector: 'ii-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() formData: DynamicFormData;
  @Input() formCssClass = '';
  @Input() initialValues: Record<string, 'any'> = {};

  @Output() submitForm: EventEmitter<FormSubmitData> = new EventEmitter();
  @Output() loadForm: EventEmitter<DynamicFormComponent> = new EventEmitter();
  @Output() groupChange: EventEmitter<Record<string, any>> = new EventEmitter();
  @Output() controlChange: EventEmitter<ControlChangeData> = new EventEmitter();

  @Input() buttons: DynamicFormButton[] = [{
    label: 'Submit',
    onClick: () => this.validateAndSubmit()
  }];

  group: FormGroup;

  isSubmitting = false;

  @ViewChildren(DynamicFieldDirective) dynamicComponents: QueryList<DynamicFieldDirective>;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  ngAfterViewInit(): void {
    this.loadForm.emit(this);
  }

  ngOnInit(): void {

    const groupValidators: ValidatorFn[] = [];

    this.group = new FormGroup({});

    this.formData.items.forEach((item: DynamicFieldData) => {
      const validators: ValidatorFn[] = getValidators(item, this.config);

      groupValidators.push(...getGroupValidators(item, this.config));

      const value = this.initialValues[item.name];

      const formControl = new FormControl(value, validators);

      formControl.valueChanges.pipe(
        takeUntil(this.destroy$)
      ).subscribe(controlValue => this.controlChange.emit({
        name: item.name,
        formControl,
        value: controlValue
      }) );

      this.group.addControl(item.name, formControl);
    });

    this.group.setValidators(groupValidators);

    this.group.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(values => this.groupChange.emit(values));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
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

  getFormElement(name: string): any {
    const arr = this.dynamicComponents.toArray();

    const connectFieldDirective = arr.find(item => item.fieldData.name === name);
    if (!connectFieldDirective) {
      throw Error(`component ${name} not found`);
    }

    return connectFieldDirective.component.instance;
  }

  getCssClass(fieldData: DynamicFieldData): string {
    const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

    return getFieldDataOptionValue(fieldDataOptions, 'cssClass', '');
  }

  getFormGroupCssClass(fieldData: DynamicFieldData): string {
    const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

    return getFieldDataOptionValue(fieldDataOptions, 'formGroupCssClass', '');
  }

  getLabelCssClass(fieldData: DynamicFieldData): string {
    const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

    return getFieldDataOptionValue(fieldDataOptions, 'labelCssClass', '');
  }

  needToShowLabelOutside(fieldData: DynamicFieldData): boolean {
    return needToShowLabelOutside(fieldData, this.config);
  }

  onButtonClick(button, event): void {
    event.preventDefault();

    button.onClick({
      form: this,
      nativeEvent: event
    });
  }

  validateAndSubmit(): void {
    if (this.isSubmitting) {
      return;
    }
    if (this.group.invalid) {
      return markAllFormControlsAsTouched(this.group);
    }

    const formData: any = this.group.getRawValue();

    this.isSubmitting = true;
    this.submitForm.emit({
      values: formData,
      setSubmitting: (isSubmitting: boolean) => this.setSubmitting(isSubmitting),
      setErrors: (errors: FormError[]) => this.setErrors(errors)
    });
  }

  setErrors(formErrors: FormError[]): void {
    setFormErrors(this.group, formErrors);
    this.isSubmitting = false;
  }

  setSubmitting(isSubmitting: boolean): void {
    this.isSubmitting = isSubmitting;
  }

  setValues(values: any): void {
    this.group.setValue(values);
  }

  patchValues(values: any): void {
    this.group.patchValue(values);
  }

}