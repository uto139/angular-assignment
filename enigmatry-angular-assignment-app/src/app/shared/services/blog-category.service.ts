import { Injectable } from '@angular/core';
import { BlogPostCategory } from '@api';
import { BlogCategoryItem } from '@shared/components/navigation/model/blog-category-menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {
  getCategories(): BlogCategoryItem[] {
    return this.getCategoriesFromEnum(BlogPostCategory);
  }

  private getCategoriesFromEnum(enumObj: any): BlogCategoryItem[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        key,
        value: enumObj[key],
        displayName: this.getLocalizedDisplayName(key)
      }));
  }

  private getLocalizedDisplayName(key: string): string {
    switch (key) {
      case 'Marketing':
        return $localize`:@@enum.blog-post-category.marketing:Marketing`;
      case 'Sales':
        return $localize`:@@enum.blog-post-category.sales:Sales`;
      case 'Service':
        return $localize`:@@enum.blog-post-category.service:Service`;
      case 'Website':
        return $localize`:@@enum.blog-post-category.website:Website`;
      default:
        return key;
    }
  }
}
