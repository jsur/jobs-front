import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Timeline } from '../shared/models/Timeline';

import { environment } from '../../environments/environment';

@Injectable()
export class TimelineService {

  url: string = environment.base_url;

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e);
  }

  createTimelineEntry(newEntry: Timeline) {
    return this.http.post(`${this.url}/api/timeline/new`, newEntry, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  getLeadTimeLineEntries(leadId) {
    return this.http.get(`${this.url}/api/timeline/${leadId}`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteTimelineEntry(entryId) {
    return this.http.delete(`${this.url}/api/timeline/${entryId}`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
    }

  getS3Credentials(filename, filetype) {
    return this.http.get(`${this.url}/api/sign-s3?file-name=${filename}&file-type=${filetype}`, this.getOptions())
      .map(res => res.json())
      .catch(this.handleError);
  }

  getOptions(): RequestOptions {
    const token = localStorage.getItem('token');
    const headers = new Headers({ 'Authorization': `JWT ${token}` });
    return (new RequestOptions({ headers: headers }));
  }

}
