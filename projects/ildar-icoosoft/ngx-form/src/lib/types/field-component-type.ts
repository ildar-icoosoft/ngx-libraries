import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DynamicField } from './dynamic-field';

export interface FieldComponentType extends Component {
  getFormElement(): Component & ControlValueAccessor;

  getCssClass(fieldData: DynamicField): string;

  isHidden(fieldData: DynamicField): boolean;

  getFormGroupCssClass(fieldData: DynamicField): string;

  getLabelCssClass(fieldData: DynamicField): string;

  needToShowLabelOutside(fieldData: DynamicField): boolean;
}
