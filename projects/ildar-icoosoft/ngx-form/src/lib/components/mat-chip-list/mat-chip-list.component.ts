import {
  Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, ChangeDetectorRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {pull as _pull} from 'lodash';
import {SelectOption} from '../../types';

@Component({
  selector: 'ii-mat-chip-list',
  templateUrl: './mat-chip-list.component.html',
  styleUrls: ['./mat-chip-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatChipListComponent),
      multi: true,
    },
  ],
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
    if (this.isDisabled) {
      return;
    }

    const newValue = [...this.value];
    if (this.value.includes(itemId)) {
      _pull(newValue, itemId);
    } else {
      newValue.push(itemId);
    }
    this.propagateChange(newValue);
    this.value = newValue; // меняем value, тк. иначе новое значение не отрисовывается
  }

  add(event: MatChipInputEvent): void {
    const {input} = event;
    const {value} = event;

    const trimmedValue = value.trim();

    if (
      this.options.some((item) => item.id === trimmedValue)
      || this.newOptions.some((item) => item.id === trimmedValue)
    ) {
      return;
    }

    if (trimmedValue) {
      this.newOptions.push({
        id: trimmedValue,
        name: trimmedValue,
      });

      const newValue = [...this.value, trimmedValue];
      this.propagateChange(newValue);
      this.value = newValue; // меняем value, тк. иначе новое значение не отрисовывается
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
//
}
