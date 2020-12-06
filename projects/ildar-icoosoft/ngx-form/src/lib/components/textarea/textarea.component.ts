import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ii-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    }
  ]
})
export class TextareaComponent implements ControlValueAccessor {

  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() inputId = '';
  @Input() readonly = false;

  value = '';

  isDisabled = false;

  constructor() { }

  propagateChange = (_: any) => {};
  propagateTouch = () => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn): void {
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


