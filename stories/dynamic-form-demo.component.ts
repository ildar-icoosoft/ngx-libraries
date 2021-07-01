import { Component, Input } from '@angular/core';
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
}
