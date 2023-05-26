import { Component, inject } from '@angular/core';
import { SidebarContent } from 'core/enums';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';

@Component({
  selector: 'del-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  sidebarToggleService = inject(SidebarToggleService);
  activeFilterOption = 'col-xl-3';
  filterOptions = [
    {
      optionCode: 'LowestPrice',
      optionName: 'ACTIONS.LOWEST_PRICE',
    },
    {
      optionCode: 'HighestPrice',
      optionName: 'ACTIONS.HIGHEST_PRICe',
    }
  ];

  drawerToggle() {
    this.sidebarToggleService.sidebarContent.next(SidebarContent.sidebarCategories);
    this.sidebarToggleService.drawer.toggle();
  }
}
