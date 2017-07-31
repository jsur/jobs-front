import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeadService } from '../../services/lead.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { ExternalService } from '../../services/external.service';

@Component({
  selector: 'app-dashboard-newlead',
  templateUrl: './dashboard-newlead.component.html',
  styleUrls: ['./dashboard-newlead.component.css']
})
export class DashboardNewleadComponent {
  @Output() modalClosed = new EventEmitter();

  newLead: Object = {};
  companyRating: Array<Object> = [];

  constructor(
    private leads: LeadService,
    private session: SessionService,
    private externals: ExternalService
  ) { }

  close() {
    this.modalClosed.emit();
  }

  submit(form: NgForm) {
    this.newLead['owner'] = this.session.user._id;
    this.leads.createLead(this.newLead)
      .subscribe(
        data => {
          this.leads.announceNewLead(data.lead);
        },
        err => {
          console.log(err);
        }
      );
    form.reset();
    this.modalClosed.emit();
  }

  getGlassDoorCompany(company: string) {
    this.externals.glassDoorData(company)
      .subscribe(
        data => {
          this.companyRating.push(data.response.employers[0]);
          console.log(this.companyRating);
        },
        err => {
          console.log(err);
        }
      )
  }

}
