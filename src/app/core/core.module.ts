import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CbNavComponent } from './nav/cb-nav.component';
import { MaterialModule } from '../material.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule
  ],
  declarations: [
    CbNavComponent,
    NotFoundComponent,
    ConfirmDialogComponent
  ],
  exports: [
    CbNavComponent,
    NotFoundComponent,
    ConfirmDialogComponent
  ]
})
export class CoreModule { }
