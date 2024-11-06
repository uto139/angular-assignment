import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogPost, BlogPostsClient } from '@api';
import { BaseEditDialogComponent } from '@shared/components/dialog/base-edit-dialog/base-edit-dialog.component';
import { BlogCategoryService } from '@shared/services/blog-category.service';
import { BLOG_POST_DIALOG_CONSTANTS } from './blog-post-dialog-constants';
import { getBlogPostEditDialogLabels } from './models/blog-post-edit-dialog-extensions';

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
    required: (propertyName: string) =>
      $localize`:@@validators.required:${propertyName}:property-name: is required`,
    maxLength: (propertyName: string, maxLength: number) =>
      $localize`:@@validators.maxLength:${propertyName}:property-name: value should be less than ${maxLength}:max-value: characters`,
    pattern: (propertyName: string) =>
      $localize`:@@validators.pattern:${propertyName}:property-name: is not in valid format`
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
