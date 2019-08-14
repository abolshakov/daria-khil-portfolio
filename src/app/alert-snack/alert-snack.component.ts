import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'pfo-alert-snack',
  templateUrl: './alert-snack.component.html',
  styleUrls: ['./alert-snack.component.scss']
})
export class AlertSnackComponent {

  constructor(private snackBarRef: MatSnackBarRef<AlertSnackComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  public dismiss() {
    this.snackBarRef.dismiss();
  }
}
