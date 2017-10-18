import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class SnackbarService {

  constructor(
      private snackBar: MatSnackBar,
  ) { }

  openSnackBar(message,action = "",time = 1000) {
      return this.snackBar.open(message,action,{
        duration: time,
      });
  }
}
