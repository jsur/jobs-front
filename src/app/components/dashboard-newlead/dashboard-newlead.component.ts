import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeadService } from '../../services/lead.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-newlead',
  templateUrl: './dashboard-newlead.component.html',
  styleUrls: ['./dashboard-newlead.component.css']
})
export class DashboardNewleadComponent {
  @Output() modalClosed = new EventEmitter();

  newLead: Object = {};

  constructor(
    private leads: LeadService,
    private session: SessionService
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

}
