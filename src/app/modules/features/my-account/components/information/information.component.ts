import { Component, inject } from '@angular/core';
import { User } from 'core/interfaces';
import { AuthService } from 'core/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'del-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  private authService = inject(AuthService);
  private destroy$ = new Subject();

  user!: User | null;
  genders: { [key: number]: string; } = {};

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => this.user = user);
    this.authService.genders.forEach(gender => this.genders[gender.id] = gender.text);
  }

  getBirthDay(birthDay: string) {
    return this.authService.getBirthDay(birthDay);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
