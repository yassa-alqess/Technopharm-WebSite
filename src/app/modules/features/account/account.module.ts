import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { FacebookLoginProvider, GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgOtpInputModule } from 'ng-otp-input';

import { AccountRoutingModule } from './account-routing.module';

import { LoginComponent } from './pages/login/login.component';

import { InputTextComponent, SubTitleComponent, TitleComponent } from 'shared/components';

import { BaseSharedModule } from 'shared/sub-modules/base-shared';

import { environment } from '../../../../environments/environment';
import { VerifyComponent } from './pages/verify/verify.component';

@NgModule({
  declarations: [
    LoginComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    NgOtpInputModule,

    BaseSharedModule,
    MatButtonModule,
    TitleComponent,
    SubTitleComponent,
    InputTextComponent
  ],
  providers: environment.enableSocialMediaLogin ? [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookClientId)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ] : [],
})
export class AccountModule { }
