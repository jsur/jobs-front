import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Timeline } from '../shared/models/Timeline';

import { environment } from '../../environments/environment';

@Injectable()
export class TimelineService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  createTimelineEntry(newEntry: Timeline) {
    return this.http.post(`${this.url}/api/timeline/new`, newEntry)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLeadTimeLineEntries(leadId) {
    return this.http.get(`${this.url}/api/timeline/${leadId}`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteTimelineEntry(entryId) {
    return this.http.delete(`${this.url}/api/timeline/${entryId}`)
      .map(res => res.json())
      .catch(this.handleError);
    }

}
