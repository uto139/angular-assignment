import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogPostsClient } from '@api';
import { BLOG_POST_DIALOG_CONSTANTS } from './blog-post-constants.component';

@Component({
  selector: 'app-blog-post-edit-dialog',
  templateUrl: './blog-post-edit-dialog.component.html',
  styleUrls: ['./blog-post-edit-dialog.component.scss']
})
export class BlogPostEditDialogComponent {
  postForm: FormGroup;

  constructor(
    private readonly client: BlogPostsClient,
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<BlogPostEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.postForm = this.fb.group({
      title: [
        data?.title || '',
        [
          Validators.required,
          Validators.maxLength(BLOG_POST_DIALOG_CONSTANTS.TITLE_MAX_LENGTH),
          Validators.pattern('^[a-zA-Z0-9 ]+$')
        ]
      ],
      text: [data?.text || '', [Validators.required, Validators.maxLength(BLOG_POST_DIALOG_CONSTANTS.TEXT_MAX_LENGTH)]],
      createdOn: [this.data.date || new Date()]
    });
  }

  onPost(): void {
    if (this.postForm.valid) {
      const updatedData = {
        id: this.data.id,
        ...this.postForm.value
      };

      this.client.createOrUpdate(updatedData).subscribe(() => {
        this.dialogRef.close(updatedData);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
