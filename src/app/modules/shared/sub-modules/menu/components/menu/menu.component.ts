import { Component, Input } from '@angular/core';

@Component({
  selector: 'del-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() btnClass = '';
  @Input() menuClass = '';
  @Input() isMenuTrigger = true;
}
