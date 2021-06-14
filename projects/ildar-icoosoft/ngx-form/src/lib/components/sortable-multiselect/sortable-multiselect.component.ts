import { Component, OnInit, ChangeDetectionStrategy, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../types';

@Component({
  selector: 'ii-sortable-multiselect',
  templateUrl: './sortable-multiselect.component.html',
  styleUrls: ['./sortable-multiselect.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SortableMultiselectComponent),
    },
  ],
})
export class SortableMultiselectComponent implements OnInit, ControlValueAccessor {
  @Input() items: SelectOption[] = [];

  @Input() placeholder = '';

  selectedItems: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  onChange: any = () => {};

  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string[] | null): void {
    if (value !== null) {
      this.selectedItems = value;
    }
  }

  changeItems(items: SelectOption[]): void {
    this.selectedItems = items.map((item) => item.id);
  }

  private moveItem(item: SelectOption, shift: number): void {
    const index = this.selectedItems.indexOf(item.id);
    if (
      (shift < 0 && index > shift + 1) ||
      (shift > 0 && index < this.selectedItems.length - shift)
    ) {
      const buf = this.selectedItems.splice(index, 1);
      this.selectedItems.splice(index + shift, 0, buf[0]);
      this.selectedItems = this.selectedItems.slice();
      this.onChange(this.selectedItems);
    }
  }

  moveLeft(item: SelectOption): void {
    this.moveItem(item, -1);
  }

  moveRight(item: SelectOption): void {
    this.moveItem(item, 1);
  }
}
