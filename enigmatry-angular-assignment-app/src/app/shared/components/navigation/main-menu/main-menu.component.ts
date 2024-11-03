import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { RouteSegments } from '@shared/model/route-segments';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { getCurrentLanguage, Language, setCurrentLanguage } from 'src/i18n/language';
import { MAIN_MENU_CONSTANTS } from './main-menu-constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  searchControl = new FormControl('');
  searchVisible: boolean = false;
  currentLanguage: Language = getCurrentLanguage();
  readonly labels = {
    myProfile: $localize`:@@main-menu.my-profile:My Profile`,
    myBlog: $localize`:@@main-menu.my-blog:My Blog`,
    dutch: $localize`:@@main-menu.languages.dutch:Dutch`,
    english: $localize`:@@main-menu.languages.english:English`,
    serbian: $localize`:@@main-menu.languages.serbian:Serbian`
  };
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

  changeLanguage(lang: Language): void {
    if (lang) {
      setCurrentLanguage(lang);
      this.currentLanguage = lang;

      window.location.reload();
    }
  }
}