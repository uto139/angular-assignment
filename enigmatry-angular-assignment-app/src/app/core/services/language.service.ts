import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { BehaviorSubject } from 'rxjs';
import { localizations } from 'src/i18n/language';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>(localStorage.getItem('language') || 'en');
  currentLang$ = this.currentLang.asObservable();

  async switchLanguage(language: string) {
    try {
      const i18n = await localizations[language]();

      // Register the new locale data
      registerLocaleData(i18n.locale, i18n.localeId, i18n.localeExtra);

      // Load new translations
      loadTranslations(i18n.messages.translations);

      // Save language preference
      localStorage.setItem('language', language);

      // Update current language
      this.currentLang.next(language);

      // Reload the application to apply changes
      window.location.reload();
    } catch (error) {

    }
  }

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }
}