import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AccountsService {
  urlDefault = `${environment.api}/account`
  constructor(private http: HttpClient) { }
  getAccount() {
    return this.http.get(this.urlDefault)

  }
  getAccountOnDetails() {
    let url = `${this.urlDefault}/details`
    return this.http.get(url)

  }
  addAccounts(data: any) {
    return this.http.post(this.urlDefault, data)
  }

  editAccount(id: any, data: any) {
    const url = this.urlDefault + `/${id}`
    return this.http.put(url, data)
  }

}
