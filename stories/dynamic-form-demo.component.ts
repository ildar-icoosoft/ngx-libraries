import { Component, Input, ViewChild } from '@angular/core';
import { DynamicFormComponent } from 'ii-ngx-form/src/lib/components';
import { DynamicForm } from 'ii-ngx-form/src/lib/types';
import { dynamicFormData } from '../data-sample/dynamic-form';

@Component({
  selector: 'dynamic-form-demo',
  template: `
    <ii-dynamic-form [formData]="formData" [initialValues]="initialValues"></ii-dynamic-form>
  `,
})
export class DynamicFormDemoComponent {
  @Input() formData: DynamicForm = dynamicFormData;

  @Input() initialValues = {};

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
