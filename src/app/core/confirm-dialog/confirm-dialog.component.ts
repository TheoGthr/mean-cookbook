import { MatDialogRef } from "@angular/material";
import { Component } from "@angular/core";

@Component({
  selector: "cb-confirm-dialog",
  template: `
    <div class="flex-title">
      <h1 mat-dialog-title>Are you sure?</h1>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
