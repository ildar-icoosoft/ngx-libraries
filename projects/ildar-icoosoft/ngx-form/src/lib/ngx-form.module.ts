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
import {CheckboxComponent} from './components/checkbox/checkbox.component';
import {MatSelectComponent} from './components/mat-select/mat-select.component';
import {MatSelectModule} from "@angular/material/select";
import {SortableMultiselectComponent} from './components/sortable-multiselect/sortable-multiselect.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {MatChipListComponent} from './components/mat-chip-list/mat-chip-list.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, SelectComponent, HtmlComponent, FieldsetComponent, MultiFieldsetComponent, ReCaptchaComponent, CheckboxComponent, MatSelectComponent, SortableMultiselectComponent, MatChipListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatSelectModule,
    NgSelectModule,
    MatChipsModule,
    MatIconModule
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
    MatSelectComponent,
    SortableMultiselectComponent
  ],
  exports: [FormValidationErrorsComponent, ValidationControlComponent, ValidationMessagePipe, DynamicFormComponent, DynamicFieldDirective, InputComponent, TextareaComponent, SelectComponent, HtmlComponent, FieldsetComponent, MultiFieldsetComponent, ReCaptchaComponent, CheckboxComponent, MatSelectComponent, SortableMultiselectComponent, MatChipListComponent],
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
