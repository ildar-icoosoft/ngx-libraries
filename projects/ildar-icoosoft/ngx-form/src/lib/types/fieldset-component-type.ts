import { Component, EventEmitter } from '@angular/core';
import { FieldComponentType } from './field-component-type';
import { LoadDictionaryEvent } from './load-dictionary-event';

export interface FieldsetComponentType extends Component {
  getFieldsetItem(name: string): FieldComponentType;
  loadDictionary: EventEmitter<LoadDictionaryEvent>;
}
