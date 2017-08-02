import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LeadService } from '../../services/lead.service';
import { Observable } from 'rxjs/Rx';
import { LeadstatusPipe } from '../../pipes/leadstatus.pipe';
import { Lead } from '../../shared/models/Lead';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

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
  };
  editLeadActive = false;

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

  handleError(e) {
    return Observable.throw(e.json().message);
  }

}
