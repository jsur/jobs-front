import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() plusButton = new EventEmitter();

  constructor(
    public session: SessionService,
    private leads: LeadService,
    public router: Router,
    private route: ActivatedRoute
  ) { }

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

}
