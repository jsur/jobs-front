import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';

@Injectable()
export class LeadService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getUserLeads(user) {
    return this.http.get(`${this.url}/api/leads/${user._id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createLead(newLead) {
    return this.http.post(`${this.url}/api/lead/new`, newLead)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
