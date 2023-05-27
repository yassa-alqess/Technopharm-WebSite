import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarContent } from 'core/enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarToggleService {

  drawer!: MatDrawer;
  sidebarContent = new BehaviorSubject<SidebarContent>(SidebarContent.headerCategories);

  constructor() { }
}
