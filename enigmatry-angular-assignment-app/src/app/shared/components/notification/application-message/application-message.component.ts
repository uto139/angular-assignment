import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-message',
  templateUrl: './application-message.component.html',
  styleUrl: './application-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationMessageComponent implements OnInit {
  @Input() message: string = 'Hello Blogger!';

  isClosed: boolean = false;
  localStorageKey: string = 'appMessageDismissed';

  ngOnInit(): void {
    const storedValue = localStorage.getItem(this.localStorageKey);
    this.isClosed = storedValue === 'true';
  }

  dismissMessage(): void {
    this.isClosed = true;
    localStorage.setItem(this.localStorageKey, 'true');
  }
}
