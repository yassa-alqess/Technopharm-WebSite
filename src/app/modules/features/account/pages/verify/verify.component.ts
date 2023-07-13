import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'core/services/auth/auth.service';
import { addMinutes, addSeconds, differenceInSeconds, format } from 'date-fns';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Config } from 'ng-otp-input/lib/models/config';

@Component({
  selector: 'del-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  config: Config = {
    length: 6,
    allowNumbersOnly: true,
  };
  verifyFormGroup!: FormGroup;
  otpDisabled = false;
  counter = '';
  private resendTimes = 0;
  private resendMethods: { [key: number]: number[]; } = {
    1: [5, 0],
    2: [5, 0],
    3: [5, 0]
  };

  get OTP() { return this.verifyFormGroup?.get('OTP') as FormControl; }

  private get storedOTP() {
    if (!localStorage.getItem('del-otp')) return 0;
    return +atob(localStorage.getItem('del-otp') as string);
  }

  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput!: NgOtpInputComponent;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.storedOTP) this.router.navigate(['/account/login']);

    this.initForm();
  }

  initForm() {
    this.verifyFormGroup = this.fb.group({
      OTP: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  verify() {
    if (!this.storedOTP) {
      this.router.navigate(['/account/login']);
      return;
    }

    if (this.storedOTP !== +this.OTP.value) {
      this.ngOtpInput.setValue(null);
      this.OTP.reset();
      this.OTP.setErrors({ wrongOTP: true });
    } else {
      this.OTP.setErrors(null);
    }

    const body = {
      phone: this.authService.userPhone
    };

    this.authService.verifyPhone(body).subscribe((userResponse) => {
      localStorage.setItem('del-user-exist', userResponse ? "true" : "false"); // create account from the pop-up in the home page.

      localStorage.removeItem('del-otp');
      this.router.navigate(['/']);
    });
  }

  resendOTP() {
    const body = {
      phone: this.authService.userPhone
    };

    this.resendTimes += 1;
    this.countDown(this.resendMethods[this.resendTimes][0], this.resendMethods[this.resendTimes][1]);

    this.authService.generateOTP(body).subscribe((otp) => {
      localStorage.setItem('del-otp', btoa(otp.toString()));
    });
  }

  countDown(minutes: number, seconds: number) {
    this.otpDisabled = true;
    let targetDate: Date;

    // set the target date to be `minutes` count after the current date/time
    targetDate = addMinutes(new Date(), minutes);

    // set the target date to be `seconds` count after the targetDate
    targetDate = addSeconds(targetDate, seconds + 1);

    const displayCountdown = () => {
      // get the current date and time
      const currentDate = new Date();

      // calculate the difference between the target date and the current date in seconds
      const difference = differenceInSeconds(targetDate, currentDate);

      // if the target date has already passed, display a message indicating so
      if (difference < 0) {
        this.otpDisabled = false;
        this.counter = '';
        clearInterval(timer);
      } else {
        // get the current date and extract the year, month, and day components
        const year = currentDate.getFullYear(),
          month = currentDate.getMonth(),
          day = currentDate.getDate();

        // create a new Date object with the current date and the countdown duration
        const countdownDate = new Date(year, month, day, 0, 0, difference);

        // formate the `countdownDate` to be minutes:seconds
        this.counter = format(countdownDate, 'mm:ss');
      }
    };

    // update the countdown every second using setInterval
    const timer = setInterval(displayCountdown, 1000);
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const otpValue = event.clipboardData?.getData('Text') || '';
    this.OTP.setValue(+this.storedOTP || +otpValue);
  }
}
