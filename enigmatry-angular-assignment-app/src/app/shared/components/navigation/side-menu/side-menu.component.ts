import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogCategoryService } from '@shared/services/blog-category.service';
import { BlogCategoryItem } from '../model/blog-category-menu-item.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  categories: BlogCategoryItem[] = [];
  selectedCategoryKey: string | null = null;

  readonly labels = {
    categoriesTitle: $localize`:@@side-menu.categories.title:Blog categories`
  };

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly categoryService: BlogCategoryService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();

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
}
