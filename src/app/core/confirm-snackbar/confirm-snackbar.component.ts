import { Component } from "@angular/core";

@Component({
  selector: "cb-confirm-snackbar",
  styleUrls: ["./confirm-snackbar.component.scss"],
  template: `
    <span class="mat-body">{{ 'recipes.deleted' | translate }}</span>
  `
})
export class ConfirmSnackbarComponent {}
