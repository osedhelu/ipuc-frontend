import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
export interface IUser {
  email: string;
  avatarUrl?: string
}

const defaultPath = '/';
const defaultUser = null;
@Injectable()
export class AuthService {
  private _user: IUser | null = defaultUser;
  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) {
    this.authResquet()
  }

  authResquet() {
    this.http.get(`${environment.api}/auth/profile`).pipe(catchError((err) => {
      console.log('error', err)
      localStorage.removeItem('token')
      return throwError(err)
    })).subscribe((resp: any) => {
      this._user = resp
      console.log('auth', resp)
      this.router.navigate(['ingreso'])
    })

  }
  async logIn(data: any): Promise<any> {
    try {
      const result: any = await this.http.post(`${environment.api}/auth/login`, data).toPromise()
      // Send request
      localStorage.setItem('token', result.access_token)
      this._user = result.data;
      this.router.navigate([this._lastAuthenticatedPath]);
      console.log(result.access_token)
      return {
        ok: true,
        data: this._user
      };
    }
    catch (e: any) {
      if (!!e.error) {
        const { error } = e
        console.log('error', error)
        return {
          ok: false,
          message: error.message
        };
      }


    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user
      };
    }
    catch {
      return {
        isOk: false,
        data: null
      };
    }
  }

  createAccount(data: any) {
    return this.http.post('/api/user', data)
  }

  changePassword(email: string, recoveryCode: string): Observable<any> {
    // Send request
    console.log('changePassword', email, recoveryCode);
    return this.http.post('/api/auth/login', { email, recoveryCode })
  }

  async resetPassword(email: string) {
    try {
      // Send request
      console.log(email);

      return {
        isOk: true
      };
    }
    catch {
      return {
        isOk: false,
        message: "Failed to reset password"
      };
    }
  }

  async logOut() {
    this._user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
  // validateAuth() {
  // this.h.get('/auth')
  // }
}
