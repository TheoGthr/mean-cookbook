import { SearchService } from '../recipes/services/search.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CbNavComponent } from './nav/cb-nav.component';
import { MaterialModule } from '../material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmSnackbarComponent } from './confirm-snackbar/confirm-snackbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    RouterModule,
    MaterialModule,
    TranslateModule
  ],
  declarations: [
    CbNavComponent,
    NotFoundComponent,
    ConfirmDialogComponent,
    ConfirmSnackbarComponent
  ],
  exports: [
    CbNavComponent,
    NotFoundComponent,
    ConfirmDialogComponent,
    ConfirmSnackbarComponent,
    TranslateModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ConfirmSnackbarComponent
  ]
})
export class CoreModule { }
