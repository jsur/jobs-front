import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class SessionService {

  public user = {};
  public token = '';
  public isAuthenticated = false;

  constructor(
    private http: Http,
    private router: Router) { }




}
