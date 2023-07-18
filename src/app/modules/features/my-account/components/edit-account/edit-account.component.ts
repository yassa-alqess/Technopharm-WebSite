import { Component, Inject, Optional, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'core/interfaces';
import { AuthService } from 'core/services';
import { format } from 'date-fns';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'del-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<EditAccountComponent>);
  private destroy$ = new Subject();

  pageTitle = '';
  user!: User | null;
  editAccountForm!: FormGroup;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; }) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.pageTitle = this.data.activatedRoute.snapshot.firstChild?.data['pageTitle'];
    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => this.user = user);
    this.initEditAccountForm();
  }

  initEditAccountForm() {
    this.editAccountForm = this.fb.group({
      FirstName: ["", [Validators.required]],
      LastName: ["", [Validators.required]],
      Email: ["", [Validators.required, Validators.email]],
      Name: [""],
      Phone: [{ value: this.authService.userPhone, disabled: true }],
      MobilePhone: [{ value: this.authService.userPhone, disabled: true }],
      UserName: [{ value: this.authService.userPhone, disabled: true }],
      Password: [{ value: this.authService.userPhone, disabled: true }],
      BirthDay: ["", [Validators.required]],
      Gender: [null, [Validators.required]],
    });

    this.editAccountForm.patchValue(this.user as User);
    this.editAccountForm.get('BirthDay')?.patchValue(new Date(this.authService.getBirthDay(this.user?.BirthDay as string)));
  }

  submit() {
    let contactInfo = this.editAccountForm.getRawValue();

    contactInfo.Name = `${contactInfo.FirstName} ${contactInfo.LastName}`;
    contactInfo.BirthDay = `/Date(${format(new Date(contactInfo.BirthDay), 'T')})/`;

    const body = {
      contact: {
        ...this.user,
        ...contactInfo,
      }
    };

    this.authService.updateAccount(body).subscribe(() => {
      this.authService.resetUserDetails();
      this.authService.getAccount().subscribe();
      this.dialogRef.close();
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
