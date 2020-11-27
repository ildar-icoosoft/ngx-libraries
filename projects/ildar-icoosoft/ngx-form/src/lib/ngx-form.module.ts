import { NgModule } from '@angular/core';
import { NgxFormComponent } from './ngx-form.component';
import { FormValidationErrorsComponent } from './form-validation-errors/form-validation-errors.component';



@NgModule({
  declarations: [NgxFormComponent, FormValidationErrorsComponent],
  imports: [
  ],
  exports: [NgxFormComponent, FormValidationErrorsComponent]
})
export class NgxFormModule { }
