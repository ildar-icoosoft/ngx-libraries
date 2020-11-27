import {ModuleWithProviders, NgModule} from '@angular/core';
import { NgxFormComponent } from './ngx-form.component';
import { FormValidationErrorsComponent } from './components/form-validation-errors/form-validation-errors.component';
import { ValidationControlComponent } from './components/validation-control/validation-control.component';
import { ValidationMessagePipe } from './pipes/validation-message.pipe';
import {CommonModule} from '@angular/common';
import {INgxFormModuleConfig} from './interfaces/ngx-form-module-config';
import {Validators} from '@angular/forms';
import {NGX_FORM_MODULE_CONFIG} from './constants/ngx-form-module-config';
import {validateEqual} from './validators';

const defaultConfig: INgxFormModuleConfig = {
  validators: {
    required: {
      isGroupValidator: false,
      validator: () => {
        return Validators.required;
      }
    },
    email: {
      isGroupValidator: false,
      validator: () => {
        return Validators.email;
      }
    },
    passwordMatch: {
      isGroupValidator: true,
      validator: (fieldData) => {
        const a = 'password';
        const b = fieldData.name;

        return validateEqual(a, b);
      }
    }
  },
  errorMessages: {
    required: 'This field is required',
    email: 'Wrong email format',
    mismatch: 'Field values mismatch',
    minLength: 'Field length is too short must be {requiredLength}, actual is {actualLength}',
    maxLength: 'Field length is too long must be {requiredLength}, actual is {actualLength}',
    age: 'The age under {requiredAge} is not accepted',
    min: 'The minimum value for an input field is {min}',
    max: 'The maximum value for an input field is {max}',
  }
};

@NgModule({
  declarations: [NgxFormComponent, FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe],
  imports: [
    CommonModule
  ],
  exports: [NgxFormComponent, FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe],
  providers: [{
    provide: NGX_FORM_MODULE_CONFIG,
    useValue: defaultConfig
  }]
})
export class NgxFormModule {
  static forRoot(config: INgxFormModuleConfig): ModuleWithProviders<NgxFormModule> {
    return {
      ngModule: NgxFormModule,
      providers: [{
        provide: NGX_FORM_MODULE_CONFIG,
        useValue: Object.assign({}, {
          validators: Object.assign({}, defaultConfig.validators, config.validators),
          errorMessages: Object.assign({}, defaultConfig.errorMessages, config.errorMessages),
        })
      }]
    };
  }
}
