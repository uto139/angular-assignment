import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SizeService } from '@services/size.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @ViewChild('drawer') drawer: MatSidenav;

  menuItems = [
    { description: 'Home', icon: 'home', aria: 'Home icon', url: '/home' }
  ];

  get menuRole(): 'dialog' | 'navigation' {
    if (this.sizeService.lastKnownSize.supportsSideMenu) {
      return 'navigation';
    }

    this.drawer?.close();
    return 'dialog';
  }

  constructor(
    readonly sizeService: SizeService) { }

  toggleDrawer = () => {
    this.drawer.toggle();
  };
}
