import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../interfaces";

@Component({
  selector: 'ii-mat-select',
  templateUrl: './mat-select.component.html',
  styleUrls: ['./mat-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatSelectComponent),
      multi: true
    }
  ]
})
export class MatSelectComponent implements OnInit, ControlValueAccessor {

  @Input() options: SelectOption[] = [];

  @Input() placeholder = '';
  @Input() inputId = '';

  value: any;

  isDisabled = false;

  constructor() { }

  ngOnInit(): void {
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
    debugger;
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
