import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BlogPostCategory } from '@api';
import { RouteSegments } from '@shared/model/route-segments';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: { key: string; value: number }[] = [];
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

  getEnumValues(enumObj: any): { key: string; value: number }[] {
    return Object.keys(enumObj)
      .filter(key => isNaN(Number(key)))
      .map(key => ({ key, value: enumObj[key] }));
  }
}
