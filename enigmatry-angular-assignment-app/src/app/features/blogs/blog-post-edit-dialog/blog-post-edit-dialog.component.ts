import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogPost, BlogPostCategory, BlogPostsClient } from '@api';
import { BLOG_POST_DIALOG_CONSTANTS } from './blog-post-dialog-constants';

@Component({
  selector: 'app-blog-post-edit-dialog',
  templateUrl: './blog-post-edit-dialog.component.html',
  styleUrls: ['./blog-post-edit-dialog.component.scss']
})
export class BlogPostEditDialogComponent {
  postForm: FormGroup;
  isEditMode: boolean;

  titleMaxLength = BLOG_POST_DIALOG_CONSTANTS.TITLE_MAX_LENGTH;
  textMaxLength = BLOG_POST_DIALOG_CONSTANTS.TEXT_MAX_LENGTH;

  categories: any[] = [
    { value: BlogPostCategory.Marketing, displayName: $localize`:@@enum.blog-post-category.marketing:Marketing` },
    { value: BlogPostCategory.Sales, displayName: $localize`:@@enum.blog-post-category.sales:Sales` },
    { value: BlogPostCategory.Service, displayName: $localize`:@@enum.blog-post-category.service:Service` },
    { value: BlogPostCategory.Website, displayName: $localize`:@@enum.blog-post-category.website:Website` }
  ];

  constructor(
    private readonly client: BlogPostsClient,
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<BlogPostEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlogPost
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.isEditMode = !!this.data?.id;
    this.postForm = this.fb.group({
      title: [
        this.data?.title ?? '',
        [
          Validators.required,
          Validators.maxLength(BLOG_POST_DIALOG_CONSTANTS.TITLE_MAX_LENGTH),
          Validators.pattern('^[a-zA-Z0-9 ]+$')
        ]
      ],
      text: [
        this.data?.text ?? '',
        [
          Validators.required,
          Validators.maxLength(BLOG_POST_DIALOG_CONSTANTS.TEXT_MAX_LENGTH)
        ]
      ],
      createdOn: [this.data?.createdOn || new Date()],
      categories: [this.data?.categories || []]
    });
  }

  onPost(): void {
    if (this.postForm.valid) {
      const updatedData = {
        id: this.data?.id,
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