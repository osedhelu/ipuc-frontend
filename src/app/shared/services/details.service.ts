import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class DetailsService {
  url: string = `${environment.api}/carteras`;
  constructor(private http: HttpClient) { }

  getDetails(): Observable<any> {
    return this.http.get(this.url);
  }
  addDetails(e: any) {
    return this.http.post(this.url, e);
  }
  updateDetails(id: any, data: any) {
    let url = `${this.url}/${id}`
    return this.http.put(url, data);
  }
}
