import { Component } from '@angular/core';
import { BlogPostCategory } from '@api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems: { key: string; value: number }[] = [];

  constructor() {
    this.menuItems = this.getEnumValues(BlogPostCategory);
  }

  getEnumValues(enumObj: any): { key: string; value: number }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ key, value: enumObj[key] }));
  }
}
