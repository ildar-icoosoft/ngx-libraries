import {Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, ChangeDetectorRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../interfaces";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {pull as _pull} from "lodash";

@Component({
  selector: 'ii-mat-chip-list',
  templateUrl: './mat-chip-list.component.html',
  styleUrls: ['./mat-chip-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatChipListComponent),
      multi: true
    }
  ]
})
export class MatChipListComponent implements OnInit, ControlValueAccessor {

  @Input() options: SelectOption[] = [];

  newOptions: SelectOption[] = [];

  @Input() label = '';
  @Input() placeholder = '';
  @Input() inputId = '';

  value: string[] = [];

  isDisabled = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  changeA(data: any): void {
    // debugger;
  }

  changeB(data: any): void {
    // debugger;
  }

  changeC(data: any): void {
    // debugger;
  }

  propagateChange = (_: any) => {};
  propagateTouch = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  writeValue(value: string[] | null): void {
    if (value !== null) {
      this.value = value;
      this.changeDetectorRef.markForCheck();
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleChipClick(itemId: string): void {
    if (this.value.includes(itemId)) {
      _pull(this.value, itemId);
    } else {
      this.value.push(itemId);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const trimmedValue = value.trim();

    if (trimmedValue) {
      const trimmedValue = value.trim();

      this.newOptions.push({
        id: trimmedValue,
        name: trimmedValue
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: SelectOption): void {
    const index = this.newOptions.indexOf(fruit);

    if (index >= 0) {
      this.newOptions.splice(index, 1);
    }
  }
//
}
