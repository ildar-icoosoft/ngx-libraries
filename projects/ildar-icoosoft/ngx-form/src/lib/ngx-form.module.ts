import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NGX_FORM_MODULE_CONFIG} from './constants/ngx-form-module-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {defaultNgxFormModuleConfig} from './configs/ngx-form-mdule.config';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {
  DynamicFormComponent, FieldsetComponent,
  FormValidationErrorsComponent, HtmlComponent,
  InputComponent, MultiFieldsetComponent, ReCaptchaComponent, SelectComponent, TextareaComponent,
  ValidationControlComponent
} from "./components";
import {ValidationMessagePipe} from "./pipes";
import {DynamicFieldDirective} from "./directives";
import {NgxFormModuleConfig} from "./interfaces";
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, SelectComponent, HtmlComponent, FieldsetComponent, MultiFieldsetComponent, ReCaptchaComponent, CheckboxComponent, MatSelectComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatSelectModule
  ],
  entryComponents: [
    InputComponent,
    ValidationControlComponent,
    FieldsetComponent,
    ReCaptchaComponent,
    HtmlComponent,
    MultiFieldsetComponent,
    SelectComponent,
    TextareaComponent,
    CheckboxComponent,
    MatSelectComponent
  ],
  exports: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, SelectComponent, HtmlComponent, FieldsetComponent, MultiFieldsetComponent, ReCaptchaComponent, CheckboxComponent, MatSelectComponent],
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
