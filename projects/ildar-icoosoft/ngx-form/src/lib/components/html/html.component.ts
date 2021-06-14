import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ii-html',
  templateUrl: './html.component.html',
  styleUrls: ['./html.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlComponent),
      multi: true,
    },
  ],
})
export class HtmlComponent implements ControlValueAccessor {
  @Input() cssClass = '';

  value = '';

  isDisabled = false;

  constructor() {}

  propagateChange = (_: any) => {};

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
}
