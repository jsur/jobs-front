import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
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
  private newLeadSource = new Subject<Object>();
  private editLeadSource = new Subject<Object>();
  private searchSource = new Subject<Object>();
  private alarmChangeSource = new Subject<Object>();
  // Observable object stream
  newEvent$ = this.newLeadSource.asObservable();
  editEvent$ = this.editLeadSource.asObservable();
  searchTerm$ = this.searchSource.asObservable();
  alarmChange$ = this.alarmChangeSource.asObservable();

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  getUserLeads(user) {
    return this.http.get(`${this.url}/api/leads/${user._id}`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  createLead(newLead: Lead) {
    return this.http.post(`${this.url}/api/lead/new`, newLead, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLead(id) {
    return this.http.get(`${this.url}/api/lead/${id}`, this.getOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  updateLead(id, lead) {
    return this.http.put(`${this.url}/api/lead/${id}`, lead, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  setLeadUpdateAtAsCurrent(id) {
    return this.http.put(`${this.url}/api/lead/updatedat/${id}`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteLead(id: string) {
    return this.http.delete(`${this.url}/api/lead/${id}`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLeadAlarms(id) {
    return this.http.get(`${this.url}/api/alarms`, this.getOptions())
      .map((res) => res.json())
      .catch(this.handleError);
  }

  announceNewLead(lead) {
    this.newLeadSource.next(lead);
  }

  announceEditLead(id: string) {
    this.editLeadSource.next(id);
  }

  announceAlarmChange() {
    this.alarmChangeSource.next('lead_content_updated');
  }

  searchChange(search) {
    this.searchSource.next(search);
  }

  getOptions(): RequestOptions {
    const token = localStorage.getItem('token');
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    return (new RequestOptions({ headers: headers }));
  }

}
