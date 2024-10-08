import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  showUserActions = false;
  @Input() categories: { description: string; icon: string; aria: string; url: string }[];
}
