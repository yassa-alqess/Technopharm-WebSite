import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SidebarToggleService } from 'core/services/sidebar-toggle/sidebar-toggle.service';
import { Subject, filter, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'del-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  hidden = false;

  private destroy$ = new Subject();

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sidebarToggleService: SidebarToggleService) {
    setTimeout(() => {
      this.sidebarToggleService.drawer = this.drawer;
    });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.hideBreadcrumb(this.activatedRoute);
    });
  }

  hideBreadcrumb(route: ActivatedRoute) {
    if (route.firstChild) {
      this.hideBreadcrumb(route.firstChild);
    } else {
      this.hidden = route.snapshot.data['breadcrumbHidden'] || false;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
