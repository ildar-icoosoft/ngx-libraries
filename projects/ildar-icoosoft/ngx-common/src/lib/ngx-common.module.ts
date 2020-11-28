import { NgModule } from '@angular/core';
import { NgxCommonComponent } from './ngx-common.component';
import { SafePipe } from './pipes/safe.pipe';



@NgModule({
  declarations: [NgxCommonComponent, SafePipe],
  imports: [
  ],
  exports: [NgxCommonComponent, SafePipe]
})
export class NgxCommonModule { }
