import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class SessionService {

  url: string = environment.base_url;
  success: Object;

  public user = {};
  public token = '';
  public isAuthenticated = false;

  constructor(
    private http: Http,
    private router: Router) { }


  signup(user) {
    return this.http.post(`${this.url}/signup`, user)
      .subscribe(
        data => {
          if (data.status === 200) {
            this.success = data;
            console.log('signup OK', this.success);
          }
        },
        err => {
          console.log(err);
        }
    );
  }

}
