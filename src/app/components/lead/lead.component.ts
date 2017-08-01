import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LeadService } from '../../services/lead.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  individualLead: Object = {};
  editLeadActive = false;

  constructor(
    private leads: LeadService,
    private route: ActivatedRoute
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
          switch (this.individualLead['status']) {
            case 'contacted': this.individualLead['status'] = 'Contacted'
            break;
            case 'replyreceived': this.individualLead['status'] = 'Reply received'
            break;
            case 'interview': this.individualLead['status'] = 'Interview'
            break;
            case 'done': this.individualLead['status'] = 'Done'
            break;
            default: this.individualLead['status'] = 'Invalid status';
          };
        },
        err => {
          this.handleError(err);
        }
      )
  }

  toggleEditLead() {
    this.editLeadActive = !this.editLeadActive;
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

}
