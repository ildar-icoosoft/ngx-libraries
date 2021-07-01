import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface FieldComponentType extends Component {
  getFormElement(): Component & ControlValueAccessor;

  readonly hidden: boolean;

  toggle(): void;

  hide(): void;

  show(): void;

  getFieldsetItem(name: string): FieldComponentType;
}
