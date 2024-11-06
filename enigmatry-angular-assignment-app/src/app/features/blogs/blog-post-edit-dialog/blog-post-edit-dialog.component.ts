import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogPost, BlogPostsClient } from '@api';
import { BaseEditDialogComponent } from '@shared/components/dialog/base-edit-dialog/base-edit-dialog.component';
import { BlogCategoryService } from '@shared/services/blog-category.service';
import { BLOG_POST_DIALOG_CONSTANTS } from './blog-post-dialog-constants';

import { getBlogPostEditDialogLabels } from './models/blog-post-edit-labels';
import { BlogPostValidationMessages } from './models/blog-post-edit-validation-messages';
import { BlogPostValidators } from './models/blog-post-edit-validators';

@Component({
  selector: 'app-blog-post-edit-dialog',
  templateUrl: './blog-post-edit-dialog.component.html',
  styleUrls: ['./blog-post-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPostEditDialogComponent extends BaseEditDialogComponent implements OnInit {
  postForm: FormGroup;
  isEditMode: boolean;
  categories: any[] = [];

  titleMaxLength = BLOG_POST_DIALOG_CONSTANTS.TITLE_MAX_LENGTH;
  textMaxLength = BLOG_POST_DIALOG_CONSTANTS.TEXT_MAX_LENGTH;

  readonly labels = {
    ...getBlogPostEditDialogLabels(),
    ...BlogPostValidationMessages.getValidationMessages()
  };

  constructor(
    private readonly client: BlogPostsClient,
    private readonly fb: FormBuilder,
    private readonly categoryService: BlogCategoryService,
    public dialogRef: MatDialogRef<BlogPostEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlogPost
  ) {
    super();
    this.initializeForm();
  }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories().map(category => ({
      value: category.value,
      displayName: category.displayName
    }));
  }

  private initializeForm(): void {
    this.isEditMode = !!this.data?.id;
    this.postForm = BlogPostValidators.createPostForm(this.fb, this.data);
  }
  onSubmit(): void {
    if (this.postForm.valid) {
      const updatedData = {
        id: this.data?.id,
        ...this.postForm.value
      };
      this.client.createOrUpdate(updatedData).subscribe(() => {
        this.dialogRef.close(updatedData);
        this.post.emit();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
    this.cancel.emit();
  }
}
