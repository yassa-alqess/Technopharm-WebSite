import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { User, UserPayload, UserResponse } from 'core/interfaces';
import { format } from 'date-fns';

interface OtpResponse {
  GenerateOtpResult: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {
  private userDetails: BehaviorSubject<User | any> = new BehaviorSubject(null);

  get userPhone() {
    if (!localStorage.getItem('del-user-phone')) return '';
    return atob(localStorage.getItem('del-user-phone') as string);
  }

  get isUserExist() {
    return localStorage.getItem("del-user-exist") === "true"; // true
  }

  get userDetails$(): Observable<User | null> {
    if (this.userDetails.value) {
      return this.userDetails.asObservable();
    }

    return this.getAccount().pipe(map(value => {
      this.userDetails.next(value);
      return value;
    }));
  }

  genders = [
    {
      id: 1,
      text: 'COMPLETE_REGISTRATION.MALE'
    },
    {
      id: 2,
      text: 'COMPLETE_REGISTRATION.FEMALE'
    },
  ];

  userContactPayload = {
    Id: "",
    Account: null,
    GoogleID: "",
    FacebookID: "",
    Email: "",
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Name: "",
    UserName: "",
    Password: "",
    Phone: "",
    MobilePhone: "",
    BirthDay: "",
    MaritalStatus: 1,
    Gender: 0,
    StoreId: "WEB",
    AlternateId: null,
    Cards: [],
    Profiles: [],
    OneLists: [],
    Addresses: [],
    SalesEntries: [],
    Notifications: [],
    PublishedOffers: [],
    Initials: "",
    Environment: {
      Currency: {
        Postfix: "EGP",
        Prefix: "EGP",
        Symbol: "E£",
        DecimalPlaces: 2,
      }
    },
    LoggedOnToDevice: {
      Platform: "WEB",
    },
  };

  resetUserDetails() {
    this.userDetails.next(null);
  }

  refreshUserDetails() {
    this.resetUserDetails();
    this.getAccount().subscribe();
  }

  generateOTP(body: { [key: string]: string; }) {
    return this.post<OtpResponse>({ APIName: 'GenerateOtp', body }).pipe(
      map(response => response.GenerateOtpResult),
      catchError(() => of(123456))
    );
  }

  verifyPhone(body: { [key: string]: string; }) {
    return this.post<UserResponse>({ APIName: 'VerifyPhone', body }).pipe(
      map(response => {
        if (response.VerifyPhoneResult) this.userDetails.next(response.VerifyPhoneResult);
        return response.VerifyPhoneResult;
      }),
    );
  }

  verifyByProviderId(provider: string, body: { [key: string]: string; }) {
    return this.post<UserResponse>({ APIName: provider === 'GOOGLE' ? 'LoginWithGoogle' : 'LoginWithFacebook', body }).pipe(
      map(response => response),
    );
  }

  getAccount(body: { [key: string]: string; } = { phone: this.userPhone }) {
    return this.verifyPhone(body);
  }

  createAccount(body: UserPayload) {
    return this.post<any>({ APIName: 'ContactCreate', body }).pipe(
      map(response => response)
    );
  }

  updateAccount(body: UserPayload) {
    return this.post<any>({ APIName: 'ContactUpdate', body }).pipe(
      map(response => response)
    );
  }

  getBirthDay(birthDay: string) {
    const date = birthDay.match(/(\((.*)\+)/);
    if (!date) return '';

    return format(new Date(Number(date.pop())), 'dd/MM/yyyy');
  }
}
