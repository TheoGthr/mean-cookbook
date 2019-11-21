import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cb-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ title }}</h1>
    <!--div mat-dialog-content>
    </div-->
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">No</button>
      <button mat-button (click)="onYesClick()" cdkFocusInitial>Yes</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  @Input() title: string;
  @Output() event = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  public onNoClick(): void {
    this.dialogRef.close();
  }
  
  public onYesClick(): void {
    this.event.emit(true);
    this.dialogRef.close();
  }
}
