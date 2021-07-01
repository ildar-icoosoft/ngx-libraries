import { Component } from '@angular/core';
import { FieldComponentType } from './field-component-type';

export interface FieldsetComponentType extends Component {
  getFieldsetItem(name: string): FieldComponentType;
}
