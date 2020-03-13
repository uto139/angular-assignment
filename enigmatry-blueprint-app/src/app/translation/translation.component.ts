import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
  apiUrl = environment.apiUrl;

  ngOnInit() {
  }

  constructor(
    private titleService: Title,
    private translate: TranslateService) {
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public useLanguage(language: string) {
    this.translate.use(language);
  }
}