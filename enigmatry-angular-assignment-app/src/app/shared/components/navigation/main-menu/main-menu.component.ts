import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { RouteSegments } from '@shared/model/route-segments';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { MAIN_MENU_CONSTANTS } from './main-menu-constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() onLogout: () => void;

  searchControl = new FormControl('');
  searchVisible: boolean = false;

  constructor(private readonly router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.searchVisible = this.router.url.includes(RouteSegments.blogs);
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(MAIN_MENU_CONSTANTS.DEBOUNCE_TIME),
        distinctUntilChanged()
      )
      .subscribe(query => {
        this.updateQueryParams(query ?? '');
      });
  }

  updateQueryParams(query: string): void {
    this.router.navigate([], {
      queryParams: { keyword: query || null },
      queryParamsHandling: 'merge'
    });
  }
}
