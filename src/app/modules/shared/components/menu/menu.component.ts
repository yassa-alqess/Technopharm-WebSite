import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { BaseSharedModule } from 'shared/sub-modules/base-shared/base-shared.module';

const MATERIAL_MODULES = [
  MatMenuModule,
  MatButtonModule,
];

@Component({
  selector: 'del-menu',
  standalone: true,
  imports: [CommonModule, BaseSharedModule, ...MATERIAL_MODULES],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() btnClass = '';
  @Input() menuClass = '';
  @Input() isMenuTrigger = true;
}
