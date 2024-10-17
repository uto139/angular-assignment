import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems = [
    { description: 'Category 1', icon: 'home', aria: 'Home icon', url: '/home' },
    { description: 'Category 2', icon: 'home', aria: 'Home icon', url: '/home' },
    { description: 'Category 3', icon: 'home', aria: 'Home icon', url: '/home' }
  ];
}
