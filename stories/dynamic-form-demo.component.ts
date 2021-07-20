import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'ii-ngx-form/src/lib/components';
import { ControlChangeData, DynamicForm, FormSubmitEvent } from 'ii-ngx-form/src/lib/types';
import { LoadDictionaryEvent } from 'ii-ngx-form/src/lib/types/load-dictionary-event';
import { dynamicFormData } from '../data-sample/dynamic-form';

@Component({
  selector: 'dynamic-form-demo',
  template: `
    <ii-dynamic-form
      [formData]="formData"
      [initialValues]="initialValues"
      (loadForm)="loadForm.emit($event)"
      (groupChange)="groupChange.emit($event)"
      (controlChange)="controlChange.emit($event)"
      (submitForm)="submitForm.emit($event)"
      (loadDictionary)="loadDictionary.emit($event)"
    ></ii-dynamic-form>
  `,
})
export class DynamicFormDemoComponent {
  @Input() formData: DynamicForm = dynamicFormData;

  @Input() initialValues = {};

  @Output() submitForm = new EventEmitter<FormSubmitEvent>();

  @Output() loadForm = new EventEmitter<DynamicFormComponent>();

  @Output() groupChange = new EventEmitter<Record<string, any>>();

  @Output() controlChange = new EventEmitter<ControlChangeData>();

  @Output() loadDictionary = new EventEmitter<LoadDictionaryEvent>();

  @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;

  // constructor() {
  //   setTimeout(() => {
  //     const el = this.dynamicForm.getFormElement('fieldset');
  //     const field = this.dynamicForm.getField('fieldset');
  //     const fieldsetItem = field.getFieldsetItem('fieldsetText2');
  //
  //     fieldsetItem.toggle();
  //
  //     this.dynamicForm.getField('hiddenText').show();
  //   }, 5000);
  // }
}
