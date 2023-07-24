import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { Subject, first, takeUntil } from 'rxjs';

@Component({
  selector: '',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: []
})
export class DialogComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private destroy$ = new Subject<any>();

  ngOnInit() {
    this.activatedRoute.data.pipe(first()).subscribe(data => this.openDialog(data));
  }

  openDialog(data: Data): void {
    const panelClass = data['panelClass']?.length ? data['panelClass'] : ['medium', 'p-0'],
      activatedRoute = this.activatedRoute.parent,
      dialogRef = this.dialog.open(data['component'], { autoFocus: false, panelClass, data: { activatedRoute } });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(_ => {
      this.router.navigate([data['redirectTo'] ? data['redirectTo'] : '..'], { relativeTo: this.activatedRoute });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
