import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { providers } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { IngresosComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule, DxListModule, DxPopupModule, DxScrollViewModule, DxTagBoxModule, DxTemplateModule } from 'devextreme-angular';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AuthGuardService } from './shared/services/auth.service';
import { DetailsComponent } from './pages/cartera/details.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './helper/error.interceptor';
registerLocaleData(localeIt, 'it');
const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'ingreso',
    component: IngresosComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'cuentas',
    component: AccountsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'carteras',
    component: DetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxTemplateModule,
    DxPopupModule,
    DxScrollViewModule,
    DxTagBoxModule, DxFormModule, DxListModule, CommonModule],
  providers: [AuthGuardService, ...providers,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  exports: [RouterModule],
  declarations: [HomeComponent, DetailsComponent, IngresosComponent, TasksComponent, AccountsComponent]
})
export class AppRoutingModule { }
