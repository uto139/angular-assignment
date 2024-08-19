import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  showUserActions = false;
  @Input() show: () => void;
  @Input() menuItems: { description: string; icon: string; aria: string; url: string }[];
  @Input() onLogout: () => void;

  readonly toggleUserActions = ($event: Event) => {
    $event.stopImmediatePropagation();
    this.showUserActions = !this.showUserActions;
  };
}
