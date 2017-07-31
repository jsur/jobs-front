import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ExternalService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  glassDoorData(company: string) {
    return this.http.get(`${this.url}/ext/glassdoor?company=${company}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
