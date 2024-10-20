import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  @Input() categories: { key: string; value: number }[] = [];

  selectedCategoryKey: string | null = null;

  selectCategory(key: string): void {
    this.selectedCategoryKey = this.selectedCategoryKey === key ? null : key;
  }

  isSelected(key: string): boolean {
    return this.selectedCategoryKey === key;
  }
}
