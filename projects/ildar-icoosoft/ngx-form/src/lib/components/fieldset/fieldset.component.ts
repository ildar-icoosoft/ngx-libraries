import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
} from '@angular/forms';
import { cloneDeep as _cloneDeep, uniqBy as _uniqBy } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeService } from 'ii-ngx-common';
import { DynamicField, DynamicFormDependency, NgxFormModuleConfig } from '../../types';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';
import { FieldsetComponentType } from '../../types/fieldset-component-type';
import { FieldComponentType } from '../../types/field-component-type';
// eslint-disable-next-line import/no-cycle
import { FieldComponent } from '../field/field.component';
import { getFieldValidators } from '../../utils/dynamic-form';

@Component({
  selector: 'ii-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => FieldsetComponent),
      multi: true,
    },
    UnsubscribeService,
  ],
})
export class FieldsetComponent implements FieldsetComponentType, OnInit, ControlValueAccessor {
  @Input() fieldData!: DynamicField;

  @Input() fieldDataWithDependencies!: DynamicField;

  @ViewChildren(FieldComponent) fieldComponents!: QueryList<FieldComponent>;

  group!: FormGroup;

  constructor(
    @Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig,
    private ngUnsubscribe$: UnsubscribeService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.fieldDataWithDependencies = this.applyDependencies(this.fieldData, {});
    this.group = this.initGroup(this.fieldDataWithDependencies, {});

    this.watchForDependenciesChange(this.fieldDataWithDependencies, this.group);
  }

  private watchForDependenciesChange(fieldData: DynamicField, formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((controlName) => {
      const formControl = formGroup.get(controlName) as FormControl;

      formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(() => {
        if (fieldData.dependencies?.[controlName]) {
          const groupValues = formGroup.getRawValue();

          this.fieldDataWithDependencies = this.applyDependencies(this.fieldData, groupValues);
          this.group = this.initGroup(this.fieldDataWithDependencies, groupValues);
          this.watchForDependenciesChange(this.fieldDataWithDependencies, this.group);
          this.cdr.markForCheck();
        }
      });
    });
  }

  private initGroup(fieldData: DynamicField, values: Record<string, unknown>): FormGroup {
    const group = new FormGroup({});

    (fieldData.items as DynamicField[]).forEach((item: DynamicField) => {
      const validators: ValidatorFn[] = getFieldValidators(item, this.config);

      const value = values[item.name] === undefined ? item.default : values[item.name];

      group.addControl(item.name, new FormControl(value, validators));
    });

    group.valueChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe((val) => {
      this.propagateChange(val);
    });

    return group;
  }

  private applyDependencies(formData: DynamicField, values: Record<string, unknown>): DynamicField {
    const formDataWithDependencies: DynamicField = _cloneDeep(formData);

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

  private mergeSchemas(
    schema: Pick<DynamicField, 'items'>,
    subschema: Pick<DynamicField, 'items'>,
  ): void {
    // eslint-disable-next-line no-param-reassign
    schema.items = _uniqBy([...(schema.items || []), ...(subschema.items || [])], 'name');
  }

  trackByField(index: number, field: DynamicField): string {
    return field.name;
  }

  getFieldsetItem(name: string): FieldComponentType {
    const arr = this.fieldComponents.toArray();

    const fieldComponent = arr.find((item) => item.fieldData.name === name);
    if (!fieldComponent) {
      throw Error(`field ${name} not found`);
    }

    return fieldComponent;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (_: any) => {};

  propagateTouch = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.group.setValue(value, {
        emitEvent: false,
      });
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.group.disable();
    } else {
      this.group.enable();
    }
  }
}
