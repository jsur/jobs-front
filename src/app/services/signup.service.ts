import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { User } from '../shared/models/User';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SignupService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${this.url}/auth/signup`, user)
      .map(res => res)
      .catch(this.handleError);
  }

}
