import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-edit-dialog',
  templateUrl: './base-edit-dialog.component.html',
  styleUrls: ['./base-edit-dialog.component.scss']
})
export class BaseEditDialogComponent {
  @Input() title: string;
  @Input() submitText: string;
  @Input() cancelText: string;
  @Output() post = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onCancel() {
 this.cancel.emit();
}
  onSubmit() {
 this.post.emit();
}
}
