import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-message',
  templateUrl: './application-message.component.html',
  styleUrl: './application-message.component.scss'
})
export class ApplicationMessageComponent implements OnInit {
  @Input() message: string = '';

  isClosed: boolean = false;
  localStorageKey: string = 'appMessageDismissed';

  ngOnInit(): void {
    // Check if the message has been dismissed from localStorage
    const storedValue = localStorage.getItem(this.localStorageKey);
    this.isClosed = storedValue === 'true'; // Convert string to boolean
  }

  dismissMessage(): void {
    this.isClosed = true;
    // Save the dismissed state to localStorage
    localStorage.setItem(this.localStorageKey, 'true');
  }
}
