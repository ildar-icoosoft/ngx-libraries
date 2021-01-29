import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';
import {NGX_FORM_MODULE_CONFIG} from '../../constants/ngx-form-module-config';
import {getFieldDataOptionValue, getFieldValidators, needToShowLabelOutside} from '../../utils/dynamic-form';
import {DynamicField, DynamicFieldOption, NgxFormModuleConfig} from "../../interfaces";

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

  @Input() items: DynamicField[] = [];

  @Input() initialValues: any = {};

  formArray!: FormArray;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  addItem(): void {
    const groupItem = this.generateGroupItem();

    this.formArray.push(groupItem);
  }

  getFormArrayControls(formArray: FormArray): FormGroup[] {
    return formArray.controls as FormGroup[];
  }

  removeItem(index: number): void {
    this.formArray.removeAt(index);
  }

  ngOnInit(): void {

    const groupItem = this.generateGroupItem();

    this.formArray = new FormArray([
      groupItem
    ]);

    this.formArray.valueChanges.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  getLabelCssClass(fieldData: DynamicField): string {
    const fieldDataOptions: DynamicFieldOption[] = fieldData.options;

    return getFieldDataOptionValue(fieldDataOptions, 'labelCssClass', '');
  }

  needToShowLabelOutside(fieldData: DynamicField): boolean {
    return needToShowLabelOutside(fieldData, this.config);
  }

  private generateGroupItem(): FormGroup {
    const group = new FormGroup({});

    this.items.forEach((item: DynamicField) => {
      const validators: ValidatorFn[] = getFieldValidators(item, this.config);

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
      this.formArray.setValue(value, {
        emitEvent: false
      });
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formArray.disable();
    } else {
      this.formArray.enable();
    }
  }
}

