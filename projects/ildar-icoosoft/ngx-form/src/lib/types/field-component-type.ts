import { Component, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { LoadDictionaryEvent } from './load-dictionary-event';

export interface FieldComponentType extends Component {
  getFormElement(): Component & ControlValueAccessor;

  readonly hidden: boolean;

  toggle(): void;

  hide(): void;

  show(): void;

  getFieldsetItem(name: string): FieldComponentType;

  loadDictionary: EventEmitter<LoadDictionaryEvent>;
}
