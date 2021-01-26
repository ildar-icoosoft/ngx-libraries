import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormValidationErrorsComponent} from './components/form-validation-errors/form-validation-errors.component';
import {ValidationControlComponent} from './components/validation-control/validation-control.component';
import {ValidationMessagePipe} from './pipes/validation-message.pipe';
import {CommonModule} from '@angular/common';
import {NgxFormModuleConfig} from './interfaces/ngx-form-module-config';
import {NGX_FORM_MODULE_CONFIG} from './constants/ngx-form-module-config';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {defaultNgxFormModuleConfig} from './configs/ngx-form-mdule.config';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { SelectComponent } from './components/select/select.component';
import { HtmlComponent } from './components/html/html.component';
import { FieldsetComponent } from './components/fieldset/fieldset.component';
import { MultiFieldsetComponent } from './components/multi-fieldset/multi-fieldset.component';
import { ReCaptchaComponent } from './components/re-captcha/re-captcha.component';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';


@NgModule({
  declarations: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, SelectComponent, HtmlComponent, FieldsetComponent, MultiFieldsetComponent, ReCaptchaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  entryComponents: [
    InputComponent,
    ValidationControlComponent,
    FieldsetComponent,
    ReCaptchaComponent,
    HtmlComponent,
    MultiFieldsetComponent,
    SelectComponent,
    TextareaComponent
  ],
  exports: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, SelectComponent, HtmlComponent, FieldsetComponent, MultiFieldsetComponent, ReCaptchaComponent],
  providers: [{
    provide: NGX_FORM_MODULE_CONFIG,
    useValue: defaultNgxFormModuleConfig
  }]
})
export class NgxFormModule {
  static forRoot(config: Partial<NgxFormModuleConfig>): ModuleWithProviders<NgxFormModule> {
    return {
      ngModule: NgxFormModule,
      providers: [{
        provide: NGX_FORM_MODULE_CONFIG,
        useValue: Object.assign({}, {
          fields: Object.assign({}, defaultNgxFormModuleConfig.fields, config.fields),
          validators: Object.assign({}, defaultNgxFormModuleConfig.validators, config.validators),
          errorMessages: Object.assign({}, defaultNgxFormModuleConfig.errorMessages, config.errorMessages),
        })
      }]
    };
  }
}
