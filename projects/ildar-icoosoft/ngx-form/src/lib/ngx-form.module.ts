import { NgModule } from '@angular/core';
import { NgxFormComponent } from './ngx-form.component';
import { FormValidationErrorsComponent } from './form-validation-errors/form-validation-errors.component';
import { ValidationControlComponent } from './validation-control/validation-control.component';



@NgModule({
  declarations: [NgxFormComponent, FormValidationErrorsComponent, ValidationControlComponent],
  imports: [
  ],
  exports: [NgxFormComponent, FormValidationErrorsComponent, ValidationControlComponent]
})
export class NgxFormModule { }
