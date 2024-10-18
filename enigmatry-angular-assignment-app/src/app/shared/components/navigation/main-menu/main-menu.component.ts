import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BlogPostsClient } from '@api';
import { SearchService } from '@app/services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
    private readonly client: BlogPostsClient,
    private readonly searchService: SearchService
  ) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(MAIN_MENU_CONSTANTS.DEBOUNCE_TIME),
        distinctUntilChanged(), // only emit if value is different from the previous one
        switchMap(query => this.search(query ?? '')
      ))
      .subscribe(response => {
        this.searchService.setSearchResults(response);
      });
  }

  search(query: string) {
    return this.client.search(query);
  }
}
