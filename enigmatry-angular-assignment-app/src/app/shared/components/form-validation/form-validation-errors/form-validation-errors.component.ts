import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-validation-errors',
  templateUrl: './form-validation-errors.component.html'
})
export class FormValidationErrorsComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldLabel: string = '';
  @Input() labels: any;
  @Input() maxLength?: number;

  readonly shouldShowError = (errorKey: string) => {
    return this.control?.hasError(errorKey) && this.control?.touched;
  };
}