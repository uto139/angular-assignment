import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { FormValidationErrorsComponent } from './form-validation-errors.component';

@NgModule({
  declarations: [
    FormValidationErrorsComponent
  ],
  imports: [
    CommonModule,
    MatError
  ],
  exports: [
    FormValidationErrorsComponent
  ]
})
export class FormValidationsModule { }