import { Component } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormGroup } from '@angular/forms';
import { FieldComponentType } from './field-component-type';

export interface DynamicFormComponentType extends Component {
  getFormElement(name: string): Component & ControlValueAccessor;

  getGroup(): FormGroup;

  getRawValues(): unknown;

  getValues(): unknown;

  getFormControl(name: string): AbstractControl;

  getField(name: string): FieldComponentType;

  setValues(values: Record<string, unknown>): void;

  patchValues(values: Record<string, unknown>): void;
}
