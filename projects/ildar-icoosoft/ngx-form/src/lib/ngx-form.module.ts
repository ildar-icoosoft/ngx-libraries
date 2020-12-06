import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormValidationErrorsComponent} from './components/form-validation-errors/form-validation-errors.component';
import {ValidationControlComponent} from './components/validation-control/validation-control.component';
import {ValidationMessagePipe} from './pipes/validation-message.pipe';
import {CommonModule} from '@angular/common';
import {NgxFormModuleConfig} from './interfaces/ngx-form-module-config';
import {NGX_FORM_MODULE_CONFIG} from './constants/ngx-form-module-config';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {validateEqual} from './validators';
import {DynamicFieldData} from './interfaces/dynamic-field-data';

const defaultConfig: NgxFormModuleConfig = {
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
      validator: (fieldData: DynamicFieldData) => {
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
    minlength: 'Field length is too short must be {requiredLength}, actual is {actualLength}',
    maxlength: 'Field length is too long must be {requiredLength}, actual is {actualLength}',
    age: 'The age under {requiredAge} is not accepted',
    min: 'The minimum value for an input field is {min}',
    max: 'The maximum value for an input field is {max}',
  }
};

@NgModule({
  declarations: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective],
  providers: [{
    provide: NGX_FORM_MODULE_CONFIG,
    useValue: defaultConfig
  }]
})
export class NgxFormModule {
  static forRoot(config: NgxFormModuleConfig): ModuleWithProviders<NgxFormModule> {
    return {
      ngModule: NgxFormModule,
      providers: [{
        provide: NGX_FORM_MODULE_CONFIG,
        useValue: Object.assign({}, {
          fields: Object.assign({}, defaultConfig.fields, config.fields),
          validators: Object.assign({}, defaultConfig.validators, config.validators),
          errorMessages: Object.assign({}, defaultConfig.errorMessages, config.errorMessages),
        })
      }]
    };
  }
}
