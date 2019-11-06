import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CbNavComponent } from './nav/cb-nav.component';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule
  ],
  declarations: [
    CbNavComponent
  ],
  exports: [
    CbNavComponent
  ]
})
export class CoreModule { }
