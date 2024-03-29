import { Component, forwardRef, Inject, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
} from '@angular/forms';
import { NGX_FORM_MODULE_CONFIG } from '../../constants/ngx-form-module-config';
import { getFieldValidators } from '../../utils/dynamic-form';
import { DynamicField, NgxFormModuleConfig } from '../../types';

@Component({
  selector: 'ii-multi-fieldset',
  templateUrl: './multi-fieldset.component.html',
  styleUrls: ['./multi-fieldset.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => MultiFieldsetComponent),
      multi: true,
    },
  ],
})
export class MultiFieldsetComponent implements OnInit, ControlValueAccessor {
  @Input() items: DynamicField[] = [];

  @Input() defaultValues: any = {};

  @Input() removeButtonText = 'Remove';

  @Input() removeButtonCssClass = 'btn btn-warning mt-2';

  @Input() addButtonText = 'Add';

  @Input() addButtonCssClass = 'btn btn-success mt-3';

  formArray!: FormArray;

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  addItem(): void {
    const groupItem = this.generateGroupItem(this.defaultValues);

    this.formArray.push(groupItem);
  }

  getFormArrayControls(formArray: FormArray): FormGroup[] {
    return formArray.controls as FormGroup[];
  }

  removeItem(index: number): void {
    this.formArray.removeAt(index);
  }

  ngOnInit(): void {
    this.formArray = new FormArray([]);

    this.formArray.valueChanges.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  private generateGroupItem(groupValues: any): FormGroup {
    const group = new FormGroup({});

    this.items.forEach((item: DynamicField) => {
      const validators: ValidatorFn[] = getFieldValidators(item, this.config);

      const value = groupValues[item.name];
      group.addControl(item.name, new FormControl(value, validators));
    });

    return group;
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
      this.formArray.clear();

      (value as any[]).forEach((groupValues: any) =>
        this.formArray.push(this.generateGroupItem(groupValues)),
      );
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
