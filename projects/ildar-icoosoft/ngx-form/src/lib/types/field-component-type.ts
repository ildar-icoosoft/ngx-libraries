import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export interface FieldComponentType extends Component {
  getFormElement(): Component & ControlValueAccessor;
}
