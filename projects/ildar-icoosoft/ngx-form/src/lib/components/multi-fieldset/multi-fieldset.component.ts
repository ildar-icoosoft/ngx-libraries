import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';
import {DynamicField} from '../../interfaces/dynamic-field';
import {NGX_FORM_MODULE_CONFIG} from '../../constants/ngx-form-module-config';
import {NgxFormModuleConfig} from '../../interfaces/ngx-form-module-config';
import {getFieldDataOptionValue, getFieldValidators, needToShowLabelOutside} from '../../utils/dynamic-form';
import {DynamicFieldOption} from '../../interfaces/dynamic-field-option';

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

