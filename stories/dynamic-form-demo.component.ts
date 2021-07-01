import { Component, Input, ViewChild } from '@angular/core';
import { DynamicForm, DynamicFormComponent } from 'ii-ngx-form';
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
  //     debugger;
  //   }, 5000);
  // }
}
