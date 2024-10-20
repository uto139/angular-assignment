import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Input() categories: { key: string; value: number }[] = [];

  selectedCategoryKey: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
