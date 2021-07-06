import { Component, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ii-mat-datepicker',
  templateUrl: './mat-datepicker.component.html',
  styleUrls: ['./mat-datepicker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => MatDatepickerComponent),
      multi: true,
    },
  ],
})
export class MatDatepickerComponent {
  @Input() placeholder = '';

  @Input() inputId = '';

  value = '';

  isDisabled = false;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (date: string | null) => {};

  propagateTouch = () => {};

  handleDateChange(date: Date | null): void {
    this.propagateChange(date?.toISOString() || null);
  }

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
