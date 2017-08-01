import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  individualLead: Object = {};

  constructor(
    private lead: LeadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getLead(params['id']);
    });
  }

  getLead(id: string) {
    this.lead.getLead(id)
      .subscribe(
        data => {
          this.individualLead = data;
          console.log(this.individualLead);
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
          console.log(err);
        }
      )
  }

}
