import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';

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

  constructor(private leads: LeadService) { }

  ngOnInit() {
    this.leads.getAllLeads()
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
