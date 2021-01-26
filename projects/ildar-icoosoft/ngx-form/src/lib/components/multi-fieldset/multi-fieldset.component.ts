import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';
import {DynamicFieldData} from '../../interfaces/dynamic-field-data';
import {NGX_FORM_MODULE_CONFIG} from '../../constants/ngx-form-module-config';
import {NgxFormModuleConfig} from '../../interfaces/ngx-form-module-config';
import {getFieldDataOptionValue, getValidators, needToShowLabelOutside} from '../../utils/dynamic-form';
import {DynamicFieldDataOption} from '../../interfaces/dynamic-field-data-option';

@Component({
  selector: 'ii-multi-fieldset',
  templateUrl: './multi-fieldset.component.html',
  styleUrls: ['./multi-fieldset.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiFieldsetComponent),
      multi: true
    }
  ]
})
export class MultiFieldsetComponent implements OnInit, ControlValueAccessor {

  @Input() items: DynamicFieldData[] = [];

  @Input() initialValues: any = {};

  group!: FormGroup;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  addItem(): void {
    const groupItem = this.generateGroupItem();

    (this.group.controls.items as FormArray).push(groupItem);
  }

  getFormArrayControls(formGroup: FormGroup, key: string): FormGroup[] {
    return (formGroup.controls[key] as FormArray).controls as FormGroup[];
  }

  removeItem(index: number): void {
    (this.group.controls.items as FormArray).removeAt(index);
  }

  ngOnInit(): void {

    const groupItem = this.generateGroupItem();

    const formArray = new FormArray([
      groupItem
    ]);

    this.group = new FormGroup({
      items: formArray
    });

    // debugger;

    this.group.valueChanges.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  getLabelCssClass(fieldData: DynamicFieldData): string {
    const fieldDataOptions: DynamicFieldDataOption[] = fieldData.options;

    return getFieldDataOptionValue(fieldDataOptions, 'labelCssClass', '');
  }

  needToShowLabelOutside(fieldData: DynamicFieldData): boolean {
    return needToShowLabelOutside(fieldData, this.config);
  }

  private generateGroupItem(): FormGroup {
    const group = new FormGroup({});

    this.items.forEach((item: DynamicFieldData) => {
      const validators: ValidatorFn[] = getValidators(item, this.config);

      const value = this.initialValues[item.name];
      group.addControl(item.name, new FormControl(value, validators));
    });

    return group;
  }


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
        emitEvent: false
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

