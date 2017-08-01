import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Lead } from '../shared/models/Lead';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';

@Injectable()
export class LeadService {

  url: string = environment.base_url;

  // Observable object sources
  private newEventSource = new Subject<Object>();
  private editEventSource = new Subject<Object>();
  // Observable object stream
  newEvent$ = this.newEventSource.asObservable();
  editEvent$ = this.editEventSource.asObservable();

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getUserLeads(user) {
    return this.http.get(`${this.url}/api/leads/${user._id}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createLead(newLead: Lead) {
    return this.http.post(`${this.url}/api/lead/new`, newLead)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLead(id) {
    return this.http.get(`${this.url}/lead/${id}`)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  updateLead(id, lead) {
    return this.http.put(`${this.url}/api/lead/${id}`, lead)
      .map(res => res.json())
      .catch(this.handleError);
  }

  announceNewLead(lead) {
    this.newEventSource.next(lead);
  }

  announceEditLead(id: string) {
    this.editEventSource.next(id);
  }

}
