import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NGX_FORM_MODULE_CONFIG } from './constants/ngx-form-module-config';
import { defaultNgxFormModuleConfig } from './configs/ngx-form-module.config';
import {
  DynamicFormComponent,
  FieldsetComponent,
  FormValidationErrorsComponent,
  HtmlComponent,
  InputComponent,
  MultiFieldsetComponent,
  ReCaptchaComponent,
  SelectComponent,
  TextareaComponent,
  ValidationControlComponent,
} from './components';
import { ValidationMessagePipe } from './pipes';
import { DynamicFieldDirective } from './directives';
import { NgxFormModuleConfig } from './types';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { MatSelectComponent } from './components/mat-select/mat-select.component';
import { SortableMultiselectComponent } from './components/sortable-multiselect/sortable-multiselect.component';
import { MatChipListComponent } from './components/mat-chip-list/mat-chip-list.component';
import { ReactJsonSchemaFormService } from './services';

@NgModule({
  declarations: [
    FormValidationErrorsComponent,
    ValidationControlComponent,
    ValidationMessagePipe,
    DynamicFormComponent,
    DynamicFieldDirective,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    HtmlComponent,
    FieldsetComponent,
    MultiFieldsetComponent,
    ReCaptchaComponent,
    CheckboxComponent,
    MatSelectComponent,
    SortableMultiselectComponent,
    MatChipListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatSelectModule,
    NgSelectModule,
    MatChipsModule,
    MatIconModule,
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
    SortableMultiselectComponent,
    MatChipListComponent,
  ],
  exports: [
    FormValidationErrorsComponent,
    ValidationControlComponent,
    ValidationMessagePipe,
    DynamicFormComponent,
    DynamicFieldDirective,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    HtmlComponent,
    FieldsetComponent,
    MultiFieldsetComponent,
    ReCaptchaComponent,
    CheckboxComponent,
    MatSelectComponent,
    SortableMultiselectComponent,
    MatChipListComponent,
  ],
  providers: [
    {
      provide: NGX_FORM_MODULE_CONFIG,
      useValue: defaultNgxFormModuleConfig,
    },
  ],
})
export class NgxFormModule {
  static forRoot(config: Partial<NgxFormModuleConfig>): ModuleWithProviders<NgxFormModule> {
    return {
      ngModule: NgxFormModule,
      providers: [
        {
          provide: NGX_FORM_MODULE_CONFIG,
          useValue: {
            fields: { ...defaultNgxFormModuleConfig.fields, ...config.fields },
            validators: { ...defaultNgxFormModuleConfig.validators, ...config.validators },
            errorMessages: { ...defaultNgxFormModuleConfig.errorMessages, ...config.errorMessages },
          },
        },
        ReactJsonSchemaFormService,
      ],
    };
  }
}
