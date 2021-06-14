import { NgModule } from '@angular/core';
import { SafePipe } from './pipes/safe.pipe';
import { ArrayIncludesPipe } from './pipes/array-includes.pipe';

@NgModule({
  declarations: [SafePipe, ArrayIncludesPipe],
  imports: [],
  exports: [SafePipe, ArrayIncludesPipe],
})
export class NgxCommonModule {}
