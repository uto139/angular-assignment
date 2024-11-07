import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BLOG_POST_DIALOG_CONSTANTS } from '../blog-post-dialog-constants';

export class BlogPostValidators {
  static readonly getTitleValidators = () => {
    return [
      Validators.required,
      Validators.maxLength(BLOG_POST_DIALOG_CONSTANTS.TITLE_MAX_LENGTH),
      Validators.pattern('^[a-zA-Z0-9 ]+$')
    ];
  };

  static readonly getTextValidators = () => {
    return [
      Validators.required,
      Validators.maxLength(BLOG_POST_DIALOG_CONSTANTS.TEXT_MAX_LENGTH)
    ];
  };

  static createPostForm(fb: FormBuilder, data?: any): FormGroup {
    return fb.group({
      title: [
        data?.title ?? '',
        BlogPostValidators.getTitleValidators()
      ],
      text: [
        data?.text ?? '',
        BlogPostValidators.getTextValidators()
      ],
      createdOn: [data?.createdOn || new Date()],
      categories: [data?.categories || []]
    });
  }
}