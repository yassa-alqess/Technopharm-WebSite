import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPayload } from 'core/interfaces';
import { format } from 'date-fns';

@Component({
  selector: 'del-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  socialAuthService = environment.enableSocialMediaLogin ? inject(SocialAuthService) : null;
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  title!: string;
  subTitle!: string;
  loginFormGroup!: FormGroup;
  languageCode = environment.defaultLang;
  enableSocialMediaLogin = environment.enableSocialMediaLogin;
  socialUser!: SocialUser;

  private destroy$ = new Subject<any>();

  private get isLargeScreen() {
    return innerWidth >= 992;
  }

  private get isMediumScreen() {
    return innerWidth >= 576 && innerWidth < 992;
  }

  get width() {
    return this.isLargeScreen ? `350` : this.isMediumScreen ? `300` : `235`;
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initForm();

    this.title = this.activatedRoute.snapshot.data['title'];
    this.subTitle = this.activatedRoute.snapshot.data['subTitle'];
    
    this.socialAuthService?.authState.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (!user) return;

      this.socialUser = user;
      console.log(user);
      // this.verifyId(user.provider);
    });
  }

  initForm() {
    this.loginFormGroup = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
    });
  }

  generateOTP() {
    this.authService.generateOTP(this.loginFormGroup.value).subscribe((otp) => {
      localStorage.setItem('del-otp', btoa(otp.toString()));
      localStorage.setItem('del-user-phone', btoa(this.loginFormGroup.get('phone')?.value));

      this.router.navigate(['/account/verify']);
    });
  }

  loginWithFB(): void {
    this.socialAuthService?.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  verifyId(provider: string) {
    const body = {
      [this.socialUser.provider === 'GOOGLE' ? 'GoogleID' : 'FacebookID']: this.socialUser.id,
      Email: this.socialUser.email,
      deviceId: '',
    };

    this.authService.verifyByProviderId(provider, body).subscribe({
      next: (userResponse) => {
        console.log(userResponse);
      },
      error: () => {
        this.createAccount();
      }
    });
  }

  createAccount() {
    const body: UserPayload = {
      contact: {
        ...this.authService.userContactPayload,
        GoogleID: this.socialUser.provider === "GOOGLE" ? this.socialUser.id : null,
        FacebookID: this.socialUser.provider === "FACEBOOK" ? this.socialUser.id : null,
        Email: this.socialUser.email,
        FirstName: this.socialUser.firstName,
        LastName: this.socialUser.lastName,
        Name: this.socialUser.name,
        UserName: this.socialUser.name.split(" ").join("").toLowerCase(),
        Password: this.socialUser.name.split(" ").join("").toLowerCase(),
        Phone: "", // to be filled in editing
        MobilePhone: "", // to be filled in editing
        BirthDay: `/Date(${format(new Date('2000'), 'T')})/`, // 1/1/2000
      }
    };

    this.authService.createAccount(body).subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

