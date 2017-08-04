import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LeadService } from '../../services/lead.service';
import { Observable } from 'rxjs/Rx';
import { LeadstatusPipe } from '../../pipes/leadstatus.pipe';
import { Lead } from '../../shared/models/Lead';
import { Timeline } from '../../shared/models/Timeline';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  timelineEntryHidden = true;

  newEntry: Timeline = {
    owner: '',
    lead: '',
    content: ''
  }

  individualLead: Lead = {
    owner: '',
    company: '',
    jobtitle: '',
    status: '',
    logourl: '',
    contactperson: {
      name: '',
      email: ''
    }
  }

  editLeadActive = false;
  deleteLeadActive = false;

  constructor(
    private leads: LeadService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.leads.editEvent$.subscribe(
      data => {
        this.toggleEditLead();
      },
      err => {
        this.handleError(err);
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getLead(params['id']);
    });
  }

  getLead(id: string) {
    this.leads.getLead(id)
      .subscribe(
        data => {
          this.individualLead = data;
        },
        err => {
          this.handleError(err);
        }
      )
  }

  toggleEditLead() {
    this.editLeadActive = !this.editLeadActive;
  }

  toggleDeleteLead() {
    this.deleteLeadActive = !this.deleteLeadActive;
  }

  deleteLead() {
    this.leads.deleteLead(this.individualLead['_id'])
      .subscribe(
        data => {
          console.log('lead delete data:', data);
          this.router.navigate(['dashboard']);
        },
        err => {
          console.log(err);
        }
      )
  }

  toggleTimelineEntry() {
    this.timelineEntryHidden = !this.timelineEntryHidden;
  }

  submitTimelineEntry(form) {
    form.reset();
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

}
