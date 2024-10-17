import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogPostsClient } from '@api';

@Component({
  selector: 'app-blog-post-edit-dialog',
  templateUrl: './blog-post-edit-dialog.component.html',
  styleUrls: ['./blog-post-edit-dialog.component.scss'] // corrected from styleUrl to styleUrls
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
      title: [data.title || '', Validators.required],
      text: [data.text || '', Validators.required]
    });
  }

  onPost(): void {
    if (this.postForm.valid) {
      if (this.data.id) {
        this.client.update(this.data.id, this.postForm.value).subscribe(() => {
          this.dialogRef.close(this.postForm.value);
        });
      } else {
        this.client.create(this.postForm.value).subscribe(newPost => {
          this.dialogRef.close(newPost);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
