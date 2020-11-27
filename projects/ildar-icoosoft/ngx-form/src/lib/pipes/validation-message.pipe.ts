import {Inject, Pipe, PipeTransform} from '@angular/core';
import {INgxFormModuleConfig} from '../interfaces/ngx-form-module-config';
import {NGX_FORM_MODULE_CONFIG} from '../constants/ngx-form-module-config';

@Pipe({
  name: 'validationMessage'
})
export class ValidationMessagePipe implements PipeTransform {

  constructor(@Inject(NGX_FORM_MODULE_CONFIG) private config: INgxFormModuleConfig) {}

  transform(errorKey: string, errorData: any): string {
    if (errorKey === 'custom') {
      return prepareValidationMessage(errorData);
    }
    if (errorKey === 'customArr') {
      return errorData.map(item => prepareValidationMessage(item)).join(', ');
    }

    if (this.config.errorMessages[errorKey]) {
      let messageTemplate = this.config.errorMessages[errorKey];

      if (typeof errorData === 'object') {
        for (const key in errorData) {
          messageTemplate = messageTemplate.replace(
            '{' + key + '}',
            errorData[key]
          );
        }
      }

      return messageTemplate;
    }

    return `[${errorKey}]`;
  }

}
