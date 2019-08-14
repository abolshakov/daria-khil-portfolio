import { AlertSnackComponent } from '../alert-snack/alert-snack.component';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private duration: number;

  constructor(private snackBar: MatSnackBar) { }

  public info(message: string[], params = {}, duration: number = environment.popupDuration): MatSnackBarRef<AlertSnackComponent> {
    return this.show(message, 'info', '#FFFFFF', params, duration);
  }

  public warning(message: string[], params = {}, duration: number = environment.popupDuration): MatSnackBarRef<AlertSnackComponent> {
    return this.show(message, 'warning', 'accent', params, duration);
  }

  public error(message: string[], params = {}, duration: number = 0): MatSnackBarRef<AlertSnackComponent> {
    return this.show(message, 'error', 'warn', params, duration);
  }

  public dismiss() {
    if (this.duration <= 0) {
      this.snackBar.dismiss();
    }
  }

  private show(message: string[], icon: string, color: string, params: any, duration: number)
    : MatSnackBarRef<AlertSnackComponent> {
    this.duration = duration;
    return this.snackBar.openFromComponent(AlertSnackComponent, {
      duration: duration,
      data: {
        message: message,
        icon: icon,
        action: 'Ok',
        color: color
      },
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'alert-container'
    });
  }
}
