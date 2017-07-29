import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SignupService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  signup(user) {
    return this.http.post(`${this.url}/signup`, user)
      .subscribe(
        data => {
            localStorage.setItem('flash-success', 'Signup successful!');
        },
        err => {
          localStorage.setItem('flash-error', JSON.parse(err._body).message);
        }
    );
  }

}
