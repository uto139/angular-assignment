import { Component, Input } from '@angular/core';
import { SizeService } from '@services/size.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  @Input() menuItems: { description: string; icon: string; aria: string; url: string }[];
  @Input() onHamburgerClick: () => void;
  @Input() onLogout: () => void;
  @Input() show: () => void;

  get showSideMenu(): boolean {
    return this.sizeService.lastKnownSize.supportsSideMenu;
  }

  constructor(readonly sizeService: SizeService) { }
}
