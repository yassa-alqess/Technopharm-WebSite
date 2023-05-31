import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'del-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() routerLink!: string | null;
  @Input() queryParams!: Params;
}
