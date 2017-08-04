import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import { SessionService } from '../../services/session.service';
import { Observable } from 'rxjs/Rx';
import { Lead } from '../../shared/models/Lead';
import { DragulaService } from 'ng2-dragula';

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

  constructor(
    private leads: LeadService,
    private session: SessionService,
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

    dragulaService.drop
      .subscribe((data) => {
      // console.log('card being moved:', data[1].id);
      // console.log('target col:', data[2].id);
      this.leads.getLead(data[1].id)
        .subscribe(
          lead => {
            lead['status'] = data[2].parentNode.id;
            lead['colIndex'] = getCardColIndex(data[1]);
            this.leads.updateLead(lead._id, lead)
              .subscribe(
                update => {
                  this.getLeads();
                },
                err => {
                  console.log(err);
                }
              )
          }
        )
    });
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
}

function getCardColIndex(card) {
  return Array.from(card.parentNode.children).indexOf(card);
}
