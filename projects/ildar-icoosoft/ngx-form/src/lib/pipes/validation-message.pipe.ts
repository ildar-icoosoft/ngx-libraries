import { Inject, Pipe, PipeTransform } from '@angular/core';
import { prepareValidationMessage } from '../utils/error';
import { NGX_FORM_MODULE_CONFIG } from '../constants/ngx-form-module-config';
import { NgxFormModuleConfig } from '../types/ngx-form-module-config';

@Pipe({
  name: 'validationMessage',
})
export class ValidationMessagePipe implements PipeTransform {
  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: NgxFormModuleConfig) {}

  transform(errorKey: string, errorData: any): string {
    if (errorKey === 'custom') {
      return prepareValidationMessage(errorData as string);
    }
    if (errorKey === 'customArr') {
      return (errorData as string[]).map((item) => prepareValidationMessage(item)).join(', ');
    }

    if (this.config.errorMessages[errorKey]) {
      let messageTemplate = this.config.errorMessages[errorKey];

      if (typeof errorData === 'object') {
        Object.keys(errorData).forEach((key) => {
          messageTemplate = messageTemplate.replace(`{${key}}`, errorData[key]);
        });
      }

      return messageTemplate;
    }

    return `[${errorKey}]`;
  }
}
