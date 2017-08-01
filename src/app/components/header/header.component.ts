import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() plusButton = new EventEmitter();
  @Output() logOut = new EventEmitter();

  constructor(
    private session: SessionService,
    private leads: LeadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  emitNewLead() {
    this.plusButton.emit();
  }

  emitLogOut() {
    this.logOut.emit();
  }

  emitEditLead() {
    const id = this.route.url['value'][1].path;
    this.leads.announceEditLead(id);
  }

}
