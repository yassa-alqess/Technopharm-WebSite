import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Params, Router, RouterModule } from '@angular/router';
import { Category } from 'core/interfaces';
import { Subject, distinctUntilChanged, filter, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { DirectivesModule } from 'shared/sub-modules/directives/directives.module';

interface IBreadCrumb {
  label: string,
  url: string,
  queryParams?: Params;
}

@Component({
  selector: 'del-breadcrumb',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, DirectivesModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  categoryRouterLink = '';
  queryParamKeyName = '';

  categories!: Category[];
  selectedCategory!: Category;
  activeCategory!: Category;
  isEnglish = false;

  breadcrumbs!: IBreadCrumb[];

  private destroy$ = new Subject();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    });
  }

  ngOnInit(): void { }

  /**
 * Recursively build breadcrumb according to activated route.
 * @param route
 * @param url
 * @param breadcrumbs
 */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrumb[] = []): IBreadCrumb[] {
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['breadcrumb'] : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path?.split('/').pop(),
      isDynamicRoute = lastRoutePart?.startsWith(':'),
      paramName = lastRoutePart?.split(':')[1];

    if (isDynamicRoute && !!route.snapshot) {
      path = path?.replace(`${lastRoutePart}`, route.snapshot.params[`${paramName}`]);
      label = route.snapshot.params[`${paramName}`];
    }

    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };

    // Set queryParams object if exist
    if (route.snapshot.queryParams && paramName) breadcrumb.queryParams = route.snapshot.queryParams;


    // Get categories based on API response
    let categoriesSubsription;
    if (route.routeConfig?.data && route.routeConfig?.data['categories']) {
      categoriesSubsription = route.data.subscribe(data => this.categories = data['categories']);
    }

    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      //If we are not on our current path yet,
      //there will be more children to look after, to build our breadcumb
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    categoriesSubsription?.unsubscribe();
    this.queryParamKeyName = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['queryParamKeyName'] : '';

    setTimeout(() => this.activeCategory = this._activeCategory as Category);
    return newBreadcrumbs;
  }

  /**
   * 
   * @param label `string`
   * @returns default label if it isn't related to the categories.
   * @returns If related, the category label based on its Id is returned.
   */
  getLabel(label: string): string {
    if (!this.categories) return label;
    if (!this.categories.find(category => category.Id === label)) return label;

    this.selectedCategory = this.categories.find(category => category.Id === label) as Category;

    if (this.selectedCategory) {
      return this.isEnglish ? this.selectedCategory.Description : this.selectedCategory.ArabicDescription;
    }

    return label;
  }

  /**
   * get active category based on the id
   * get active subCategory based on the subCategory code
   */
  private get _activeCategory(): Category | null {
    if (!this.selectedCategory) return null;
    const queryParam = this.activatedRoute.snapshot.queryParamMap.get(this.queryParamKeyName),
      subCategory = this.selectedCategory.ProductGroups?.find(category => category.Id === this.getCategoryId(queryParam)) as Category;

    if (subCategory) return subCategory;

    return this.selectedCategory;
  }

  private getCategoryId(categoryRouterLink: string | null) {
    return categoryRouterLink?.replaceAll('_', ' ');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
