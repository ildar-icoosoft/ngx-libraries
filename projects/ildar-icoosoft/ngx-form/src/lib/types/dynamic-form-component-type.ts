import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FieldComponentType } from './field-component-type';

export interface DynamicFormComponentType extends Component {
  getGroup(): FormGroup;
  getRawValues(): any;
  getValues(): any;
  getFormControl(name: string): AbstractControl;
  getFormElement(name: string): Component;
  getField(name: string): FieldComponentType;
  setValues(values: Record<string, any>): void;
  patchValues(values: Record<string, any>): void;
}
