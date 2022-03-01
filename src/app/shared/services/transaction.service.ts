import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TransactionService {
    url = `${environment.api}/transaccion`
    constructor(private http: HttpClient) { }
    emit(data: any): Observable<any> {
        return this.http.post(this.url, data)
    }
    get(): Observable<any> {
        return this.http.get(this.url)
    }

}
