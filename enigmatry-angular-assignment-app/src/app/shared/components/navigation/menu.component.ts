import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouteSegments } from '@shared/model/route-segments';
import { filter } from 'rxjs';
import { BlogCategoryItem } from './model/blog-category-menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuItems: BlogCategoryItem[] = [];
  showSideMenu: boolean = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showSideMenu = this.router.url.includes(`/${RouteSegments.blogs}`);
    });
  }
}
