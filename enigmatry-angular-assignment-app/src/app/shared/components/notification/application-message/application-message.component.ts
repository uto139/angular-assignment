import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/services/local-storage.service';

@Component({
  selector: 'app-application-message',
  templateUrl: './application-message.component.html',
  styleUrls: ['./application-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationMessageComponent implements OnInit {
  @Input() readonly message: string = 'Hello Blogger!';
  isClosed: boolean = false;
  readonly localStorageKey: string = 'appMessageDismissed';

  constructor(private readonly localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const storedValue = this.localStorageService.getItem(this.localStorageKey);
    this.isClosed = storedValue === 'true';
  }

  dismissMessage(): void {
    this.isClosed = true;
    this.localStorageService.setItem(this.localStorageKey, 'true');
  }
}
