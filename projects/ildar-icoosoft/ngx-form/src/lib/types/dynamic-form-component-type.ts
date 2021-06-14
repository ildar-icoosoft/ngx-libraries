import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface DynamicFormComponentType extends Component {
  getGroup(): FormGroup;
  getRawValues(): any;
  getValues(): any;
  getFormControl(name: string): AbstractControl;
  getFormElement(name: string): Component;
  setValues(values: Record<string, any>): void;
  patchValues(values: Record<string, any>): void;
}
