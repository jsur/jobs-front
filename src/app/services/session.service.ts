import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';

export class SessionUser {
  username: string;
  _id: string;
}


@Injectable()
export class SessionService {

  public user: SessionUser = {username: '', _id: ''};
  public token = '';
  public isAuthenticated = false;

  url: string = environment.base_url;

  constructor(
    private http: Http,
    private router: Router) { }

  login(user) {
    return this.http.post(`${this.url}/login`, user)
      .map(res => {
        const json = res.json();
        const token = json.token;
        const loggedInUser = json.user;

        if (token) {
          this.token = token;
          this.user = {
            _id: loggedInUser._id,
            username: loggedInUser.username
          }
          this.isAuthenticated = true;
          localStorage.setItem('token', this.token);
        }

        return this.isAuthenticated;

      }).catch(this.handleError);
  }


  logout() {
    this.token = '';
    this.user = {username: '', _id: ''}
    this.isAuthenticated = false;
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  canActivate(): Observable<boolean> | boolean {

    const token = localStorage.getItem('token');

    if (token) {
      const headers = new Headers({ 'Authorization': `JWT ${token}` });
      const options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.url}/ping`, options)
        .map((data) => {
          if (data) {
            this.isAuthenticated = true;
            this.token = token;
            return true;
          }
          return false;
        })
        .catch(this.handleError);
    } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
