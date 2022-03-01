import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
// import { AlertService, aling, from, status } from '@services/alertService/alert.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private router: Router) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // _("Interception In Progress"); // Interception Stage
        let token = localStorage.getItem('token'); // This retrieves a token from local storage
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
        // req = req.clone({ headers: req.headers.set('token-eth', token) });// This clones HttpRequest and Authorization header with Bearer token added
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // Catching Error Stage
                    if (error && error.status === 401) {
                        if (error.error) {
                            if (error.error.code === 339) {
                                // this._alert.show(from.bottom, aling.right, status.error, 'debe de registrarte')
                                notify({
                                    message: error.error?.message,
                                    type: "error",
                                    displayTime: 3000,
                                    height: 100
                                });
                                this.router.navigate(['/login-form'])
                            } else {
                                notify({
                                    message: error.error?.message,
                                    type: "error",
                                    displayTime: 3000,
                                    height: 100
                                });

                            }
                            // this._alert.show(from.bottom, aling.right, status.error, error.error?.message)
                        }
                        // _("ERROR 401 UNAUTHORIZED") // in case of an error response the error message is displayed
                    }
                    const err = error.error?.message || error.statusText;
                    notify({
                        message: err,
                        type: "error",
                        displayTime: 3000,
                        height: 100
                    });

                    return throwError(error); // any further errors are returned to frontend
                })
            );
    }
}