import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BlogPostCategory } from '@api';
import { RouteSegments } from '@shared/model/route-segments';
import { filter } from 'rxjs';
import { BlogCategoryMenuItem } from './model/blog-category-menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: BlogCategoryMenuItem[] = [];
  isBlogsRoute: boolean = false;

  constructor(private readonly router: Router) {
    this.menuItems = this.getEnumValues(BlogPostCategory);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isBlogsRoute = this.router.url.includes(`/${RouteSegments.blogs}`);
    });
  }

  getEnumValues(enumObj: any): BlogCategoryMenuItem[] {
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
