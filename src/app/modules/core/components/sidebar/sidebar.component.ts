import { Component, inject } from '@angular/core';
import { SidebarContent } from 'core/enums';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';

@Component({
  selector: 'del-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sidebarContent = inject(SidebarToggleService).sidebarContent;
  SidebarContent = SidebarContent;
}
