import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FieldComponentType } from './field-component-type';

export interface DynamicFormComponentType extends Component {
  getGroup(): FormGroup;

  getRawValues(): unknown;

  getValues(): unknown;

  getFormControl(name: string): AbstractControl;

  getField(name: string): FieldComponentType;

  setValues(values: Record<string, unknown>): void;

  patchValues(values: Record<string, unknown>): void;
}
