import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseEditDialogComponent } from './base-edit-dialog/base-edit-dialog.component';

@NgModule({
  declarations: [
    BaseEditDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    BaseEditDialogComponent
  ]
})
export class DialogsModule { }
