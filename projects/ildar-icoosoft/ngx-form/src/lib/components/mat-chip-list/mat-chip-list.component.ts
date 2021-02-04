import {Component, OnInit, ChangeDetectionStrategy, Input, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "../../interfaces";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";

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

  @Input() label = '';
  @Input() inputId = '';

  value: any;

  isDisabled = false;

  //
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  //

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
    this.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }




  //
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      const trimmedValue = value.trim();

      this.options.push({
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
    const index = this.options.indexOf(fruit);

    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }
//
}
