import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
  })
  export class NotificationService {
    public readonly config: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    };

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    private readonly defaultDuration = 5000;

    constructor(private readonly snackBar: MatSnackBar) { }


    error(message: string, duration: number = this.defaultDuration) {
      this.show(message, {
        ...this.config,
        duration,
        panelClass: 'error-notification-overlay'
      });
    }

    show(message: string, configuration: MatSnackBarConfig, action?: string) {
      return this.snackBar.open(message, action, configuration);
    }
  }
