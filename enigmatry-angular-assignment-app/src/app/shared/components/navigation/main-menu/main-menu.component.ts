import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MAIN_MENU_CONSTANTS } from './main-menu-constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  @Input() menuItems: { key: string; value: number }[] = [];
  @Input() onLogout: () => void;

  searchControl = new FormControl('');

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
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
      queryParams: { keyword: query || null }, // Update 'keyword' in query params, remove if empty
      queryParamsHandling: 'merge'// keep other filters
    });
  }
}
