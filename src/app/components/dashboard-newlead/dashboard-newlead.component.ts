import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeadService } from '../../services/lead.service';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { ExternalService } from '../../services/external.service';
import { Lead } from '../../shared/models/Lead';

@Component({
  selector: 'app-dashboard-newlead',
  templateUrl: './dashboard-newlead.component.html',
  styleUrls: ['./dashboard-newlead.component.css']
})
export class DashboardNewleadComponent implements OnInit {
  @Output() modalClosed = new EventEmitter();

  newLead: Lead = {
    owner: '',
    company: '',
    jobtitle: '',
    status: '',
    logourl: '',
    contactperson: {
      name: '',
      email: ''
    },
    isFavorite: false
  };
  companyRating: Array<Object> = [];
  searchedCompanyNameLength: number;

  constructor(
    private leads: LeadService,
    private session: SessionService,
    private externals: ExternalService
  ) { }

  ngOnInit() {

  }

  close(form: NgForm) {
    this.cleanCompanyCard();
    form.reset();
    this.modalClosed.emit();
  }

  submit(form: NgForm) {
    this.newLead.owner = this.session.user._id;
    this.leads.createLead(this.newLead)
      .subscribe(
        data => {
          this.leads.announceNewLead();
        },
        err => {
          console.log(err);
        }
      );
    form.reset();
    this.cleanCompanyCard();
    this.modalClosed.emit();
  }

  getGlassDoorCompany(company: string, form: NgForm) {

    if (company.length > 2) {

      this.searchedCompanyNameLength = this.getCompanyNameLength(company);

      this.externals.glassDoorData(company)
        .subscribe(
          data => {
            if (data.response.employers.length > 0) {
              this.companyRating.push(data.response.employers[0]);
              // Set logourl from API data
              form.controls.logourl.markAsDirty();
              form.controls.logourl.markAsTouched();
              form.controls.logourl.setValue(data.response.employers[0].squareLogo);
            }
          },
          err => {
            console.log(err);
          }
        )
    }
  }

  cleanCompanyCard() {
    this.companyRating = [];
  }

  watchFieldChanges(field) {
    if (field.model !== undefined && field.model !== null && field.model.length < this.searchedCompanyNameLength) {
      this.cleanCompanyCard();
    }
  }

  getCompanyNameLength(string) {
    return string.length;
  }

}
