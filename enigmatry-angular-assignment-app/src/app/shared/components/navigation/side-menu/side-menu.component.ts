import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostCategory } from '@api';
import { BlogCategoryMenuItem } from '../model/blog-category-menu-item.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  categories: BlogCategoryMenuItem[] = [];

  readonly labels = {
    categoriesTitle: $localize`:@@side-menu.categories.title:Blog categories`
  };

  selectedCategoryKey: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categories = this.getCategoriesFromEnum(BlogPostCategory);
    this.route.queryParams.subscribe(params => {
      this.selectedCategoryKey = params.category || null;
    });
  }

  selectCategory(key: string): void {
    this.selectedCategoryKey = this.selectedCategoryKey === key ? null : key;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.selectedCategoryKey },
      queryParamsHandling: 'merge'
    });
  }

  isSelected(key: string): boolean {
    return this.selectedCategoryKey === key;
  }

  private getCategoriesFromEnum(enumObj: any): BlogCategoryMenuItem[] {
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
