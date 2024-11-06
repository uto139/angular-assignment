export class BlogPostValidationMessages {
  static getValidationMessages() {
    return {
      required: (propertyName: string) =>
        $localize`:@@blogs.validators.required:${propertyName}:property-name: is required`,
      maxLength: (propertyName: string, maxLength: number) =>
        $localize`:@@blogs.validators.maxLength:${propertyName}:property-name: value should be less than ${maxLength}:max-value: characters`,
      pattern: (propertyName: string) =>
        $localize`:@@blogs.validators.pattern:${propertyName}:property-name: is not in valid format`
    };
  }
}