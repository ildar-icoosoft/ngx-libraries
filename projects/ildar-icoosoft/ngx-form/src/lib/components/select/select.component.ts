import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentWithDictionary } from '../../types/component-with-dictionary';
import { SelectOption } from '../../types';

@Component({
  selector: 'ii-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, ComponentWithDictionary {
  @Input() options: SelectOption[] = [];

  @Input() inputId = '';

  value: unknown = '';

  isDisabled = false;

  trackByOption(index: number, item: SelectOption): string {
    return item.id;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (value: unknown) => {};

  propagateTouch = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  writeValue(value: string | undefined): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setOptions(options: SelectOption[]): void {
    this.options = options;
  }
}
