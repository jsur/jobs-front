import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { SessionService } from '../../services/session.service';
import { TimelineService } from '../../services/timeline.service';
import { Observable } from 'rxjs/Rx';
import { Lead } from '../../shared/models/Lead';
import { Timeline } from '../../shared/models/Timeline';
import { DragulaService } from 'ng2-dragula';
import { LeadstatusPipe } from '../../pipes/leadstatus.pipe';

@Component({
  selector: 'app-dashboard-columns',
  templateUrl: './dashboard-columns.component.html',
  styleUrls: ['./dashboard-columns.component.css']
})
export class DashboardColumnsComponent implements OnInit {

  leadsContacted: Array<Object>;
  leadsReplyReceived: Array<Object>;
  leadsInterview: Array<Object>;
  leadsDone: Array<Object>;

  newTimelineEntry: Timeline;

  constructor(
    private leads: LeadService,
    private session: SessionService,
    private timeline: TimelineService,
    private dragulaService: DragulaService
  ) {
    this.leads.newEvent$.subscribe(
      data => {
        this.getLeads();
      },
      err => {
        console.log(err);
      }
    )

    // card being moved = data[1].id
    // target column = data[2].id)

    this.dragulaService.drop
      .subscribe(
        data => {
          if (data[2].id !== data[3].id) {
            this.leads.getLead(data[1].id)
              .subscribe(
                lead => {
                  lead['status'] = data[2].parentNode.id;
                  // this.statusChangeTimelineEntry(data);
                  this.leads.updateLead(lead._id, lead)
                    .subscribe(
                      updatedLead => {
                        // console.log(updatedLead);
                        // ????????? what happens when responses multiply?
                        // this.statusChangeTimelineEntry(data);
                      }
                    )
                }
              )
            }
          }
        )
    }

  ngOnInit() {
    this.getLeads();
  }

  getLeads() {
    this.leads.getUserLeads(this.session.user)
      .subscribe(
        data => {
          this.leadsContacted = data.leadsContacted;
          this.leadsReplyReceived = data.leadsReplyReceived;
          this.leadsInterview = data.leadsInterview;
          this.leadsDone = data.leadsDone;
        },
        err => {
          console.log(err);
        }
      );
  }

  getCardColIndex(card) {
    return Array.from(card.parentNode.children).indexOf(card);
  }

  statusChangeTimelineEntry(data) {

    if (data[2].parentNode.id === data[3].parentNode.id) {
      return;
    }

    const movedFrom = new LeadstatusPipe().transform(data[3].parentNode.id);
    const movedTo = new LeadstatusPipe().transform(data[2].parentNode.id);

    this.newTimelineEntry = {
      owner: this.session.user._id,
      lead: data[1].id,
      content: `Status change: Moved from ${movedFrom} to ${movedTo}.`,
      creator: 'app'
    }
    this.timeline.createTimelineEntry(this.newTimelineEntry)
      .subscribe(
        newEntry => {
          console.log(newEntry.timelineEntry.content);
        },
        err => {
          console.log(err);
        }
      );
  }
}
