import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { LoginGuard } from 'core/guards/login/login.guard';

const routes: Routes = [
  {
    path: 'register',
    data: {
      title: 'USER_HEADER_LIST.REGISTER',
      subTitle: 'ACCOUNT.REGISTER_HINT'
    },
    component: LoginComponent,
  },
  {
    path: 'login',
    data: {
      title: 'USER_HEADER_LIST.SIGN_IN',
      subTitle: 'ACCOUNT.SIGN_IN_HINT'
    },
    component: LoginComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
