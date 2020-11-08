import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private sb: MatSnackBar ) {
  }

  private showSnackBar = (msg: string, action: string = 'X', panelClass: string[] = ['snackbar-addition']) => {
    this.sb.open(msg, action, {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      politeness: "assertive",
      panelClass: panelClass
    });
  }

  public error = (msg?: string) => this.showSnackBar(msg || 'Error', 'X', ['error-snackbar']);
  public success = (msg?: string) => this.showSnackBar(msg || 'Success', 'X', ['success-snackbar']);
  public info = (msg?: string) => this.showSnackBar(msg || '', 'X', ['warning-snackbar']);

}
