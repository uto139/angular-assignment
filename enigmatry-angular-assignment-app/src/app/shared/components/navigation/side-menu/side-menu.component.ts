import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogCategoryMenuItem } from '../model/blog-category-menu-item.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit {
  @Input() categories: BlogCategoryMenuItem[] = [];

  readonly labels = {
    categoriesTitle: $localize`:@@side-menu.categories.title:Blog categories`
  };

  selectedCategoryKey: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
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
