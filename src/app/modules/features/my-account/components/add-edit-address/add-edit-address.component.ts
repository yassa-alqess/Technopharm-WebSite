import { Component, Inject, Optional, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User, UserPayload } from 'core/interfaces';
import { AuthService } from 'core/services';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'del-add-edit-address',
  templateUrl: './add-edit-address.component.html',
  styleUrls: ['./add-edit-address.component.scss']
})
export class AddEditAddressComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private dialogRef = inject(MatDialogRef<AddEditAddressComponent>);
  private destroy$ = new Subject();

  isEdit = false;
  pageTitle = '';
  user!: User;
  addresses!: User['Addresses'];
  addressIndex = 0;
  addressForm!: FormGroup;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: { activatedRoute: ActivatedRoute; }) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.isEdit = this.data.activatedRoute.snapshot.firstChild?.data['isEdit'];
    this.pageTitle = this.data.activatedRoute.snapshot.firstChild?.data['pageTitle'];
    this.addressIndex = +(this.data.activatedRoute.snapshot.firstChild?.paramMap.get('addressIndex') as string);

    if (isNaN(this.addressIndex)) this.dialogRef.close();

    this.authService.userDetails$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.user = user as User;
      this.addresses = user?.Addresses as User['Addresses'];
    });
    this.initAddressForm();
  }

  initAddressForm() {
    this.addressForm = this.fb.group({
      Id: "",
      Number: [this.authService.userPhone],
      PhoneNumber: [this.authService.userPhone],
      CellPhoneNumber: [this.authService.userPhone],
      ApartmentNo: [""],
      FloorNo: [""],
      Street: ["", [Validators.required]],
      HouseNo: ["", [Validators.required]],
      Country: [null, [Validators.required]],
      City: [null, [Validators.required]],
      Area: [null],
      Type: 0,
      LineNO: 0,
      Address1: "",
      Address2: "",
    });

    if (this.isEdit && this.addresses) this.addressForm.patchValue(this.addresses[this.addressIndex]);
  }

  submit() {
    let Addresses = this.addresses, body: UserPayload, Address = this.addressForm.getRawValue();

    if (this.isEdit) {
      if (Addresses) Addresses[this.addressIndex] = Address;

      body = {
        contact: {
          ...this.user,
          Addresses,
        }
      };
    } else {
      if (Addresses) Addresses.push(Address);

      body = {
        contact: {
          ...this.user,
          Addresses,
        }
      };
    }

    this.authService.updateAccount(body).subscribe(() => {
      this.authService.refreshUserDetails();
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
