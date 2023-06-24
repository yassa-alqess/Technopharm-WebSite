import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { catchError, map, of } from 'rxjs';
import { UserPayload, UserResponse } from 'core/interfaces';

interface OtpResponse {
  GenerateOtpResult: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  get userPhone() {
    if (!localStorage.getItem('del-user-phone')) return '';
    return atob(localStorage.getItem('del-user-phone') as string);
  }

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

  generateOTP(body: { [key: string]: string; }) {
    return this.post<OtpResponse>({ APIName: 'GenerateOtp', body }).pipe(
      map(response => response.GenerateOtpResult),
      catchError(() => of(123456))
    );
  }

  verifyPhone(body: { [key: string]: string; }) {
    return this.post<UserResponse>({ APIName: 'VerifyPhone', body }).pipe(
      map(response => response.VerifyPhoneResult),
    );
  }

  verifyByProviderId(provider: string, body: { [key: string]: string; }) {
    return this.post<UserResponse>({ APIName: provider === 'GOOGLE' ? 'LoginWithGoogle' : 'LoginWithFacebook', body }).pipe(
      map(response => response),
    );
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
}
