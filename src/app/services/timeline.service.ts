import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Timeline } from '../shared/models/Timeline';

import { environment } from '../../environments/environment';

const token = localStorage.getItem('token');
const headers = new Headers({ 'Authorization': `JWT ${token}` });
const options = new RequestOptions({ headers: headers });

@Injectable()
export class TimelineService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e);
  }

  createTimelineEntry(newEntry: Timeline) {
    return this.http.post(`${this.url}/api/timeline/new`, newEntry, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLeadTimeLineEntries(leadId) {
    return this.http.get(`${this.url}/api/timeline/${leadId}`, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteTimelineEntry(entryId) {
    return this.http.delete(`${this.url}/api/timeline/${entryId}`, options)
      .map(res => res.json())
      .catch(this.handleError);
    }
}
