import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { LeadService } from '../../services/lead.service';
import { Lead } from '../../shared/models/lead';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() plusButton = new EventEmitter();

  alarms: Array<Lead>;

  constructor(
    public session: SessionService,
    private leads: LeadService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.leads.alarmChange$
      .subscribe(
        data => {
          this.getAlarms();
        },
        err => {
          console.log(err);
        }
      )
  }

  ngOnInit() {
    this.getAlarms();
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  emitNewLead() {
    this.plusButton.emit();
  }

  logout() {
    this.session.logout();
  }

  emitEditLead() {
    const id = this.route.url['value'][1].path;
    this.leads.announceEditLead(id);
  }

  searchPattern(e) {
    this.leads.searchChange(e.target.value);
  }

  getAlarms() {

    if (this.route.url['value'].length !== 0) {
      this.leads.getLeadAlarms(this.session.user._id)
        .subscribe(
          data => {
            this.alarms = data;
          },
          err => {
            console.log(err);
          }
        )
      }
  }

}
