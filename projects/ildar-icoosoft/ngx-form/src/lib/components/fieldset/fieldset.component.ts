import {Component, forwardRef, Inject, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, ValidatorFn} from '@angular/forms';
import {DynamicField, NgxFormModuleConfig, DynamicFieldOption} from '../../types';
import {NGX_FORM_MODULE_CONFIG} from '../../constants/ngx-form-module-config';
import {getFieldDataOptionValue, getFieldValidators, needToShowLabelOutside} from '../../utils/dynamic-form';

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

  @Input() items: DynamicField[] = [];

  group!: FormGroup;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  ngOnInit(): void {

    this.group = new FormGroup({});

    this.items.forEach((item: DynamicField) => {
      const validators: ValidatorFn[] = getFieldValidators(item, this.config);

      this.group.addControl(item.name, new FormControl(null, validators));
    });

    this.group.valueChanges.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  getLabelCssClass(fieldData: DynamicField): string {
    const fieldDataOptions: DynamicFieldOption[] = fieldData.options || [];

    return getFieldDataOptionValue(fieldDataOptions, 'labelCssClass', '');
  }

  needToShowLabelOutside(fieldData: DynamicField): boolean {
    return needToShowLabelOutside(fieldData, this.config);
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
