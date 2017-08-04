import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LeadService } from '../../services/lead.service';
import { TimelineService } from '../../services/timeline.service';
import { SessionService } from '../../services/session.service';
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

  allTimelineEntries: Array<Object>;

  editLeadActive = false;
  deleteLeadActive = false;

  constructor(
    private leads: LeadService,
    private timeline: TimelineService,
    private session: SessionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.leads.editEvent$.subscribe(
      data => {
        this.toggleEditLead();
      },
      err => {
        console.log(err);
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getLead(params['id']);
    });

    this.getLeadTimelineEntries(this.route.snapshot.params['id']);
  }

  getLead(id: string) {
    this.leads.getLead(id)
      .subscribe(
        data => {
          this.individualLead = data;
        },
        err => {
          console.log(err);
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

  cancelTimelineEntry(form) {
    form.reset();
    this.toggleTimelineEntry();
  }

  submitTimelineEntry(form) {

    this.newEntry.owner = this.session.user._id;
    this.newEntry.lead = this.route.snapshot.params['id'];

    this.timeline.createTimelineEntry(this.newEntry)
      .subscribe(
        data => {
          this.getLeadTimelineEntries(this.newEntry.lead);
        },
        err => {
          console.log(err);
        }
      )

    form.reset();
    this.toggleTimelineEntry();
  }

  getLeadTimelineEntries(id) {
    this.timeline.getLeadTimeLineEntries(id)
      .subscribe(
        data => {
          this.allTimelineEntries = data;
        },
        err => {
          console.log(err);
        }
      )
  }

  deleteTimelineEntry(event) {
    this.timeline.deleteTimelineEntry(event.target.parentNode.id)
      .subscribe(
        data => {
          this.getLeadTimelineEntries(this.route.snapshot.params['id']);
        },
        err => {
          console.log(err);
        }
      )
  }

}
