import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';
import {DynamicFieldData} from '../../interfaces/dynamic-field-data';
import {NGX_FORM_MODULE_CONFIG} from '../../constants/ngx-form-module-config';
import {NgxFormModuleConfig} from '../../interfaces/ngx-form-module-config';
import {getFieldDataOptionValue, getValidators, needToShowLabelOutside} from '../../utils/dynamic-form';
import {DynamicFieldDataOption} from '../../interfaces/dynamic-field-data-option';

@Component({
  selector: 'ii-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldsetComponent),
      multi: true
    }
  ]
})
export class FieldsetComponent implements OnInit, ControlValueAccessor {

  @Input() items: DynamicFieldData[] = [];

  @Input() initialValues: any = {};

  group: FormGroup;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  ngOnInit(): void {

    this.group = new FormGroup({});

    this.items.forEach((item: DynamicFieldData) => {
      const validators: ValidatorFn[] = getValidators(item, this.config);

      const value = this.initialValues[item.name];
      this.group.addControl(item.name, new FormControl(value, validators));
    });

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


  propagateChange = (_: any) => {};
  propagateTouch = () => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
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
