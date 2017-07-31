import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newLeadActive = false;

  constructor(private session: SessionService) { }

  ngOnInit() {

  }

  logout() {
    this.session.logout();
  }

  newLead() {
    this.newLeadActive = !this.newLeadActive;
  }

  onModalClosed() {
    this.newLeadActive = false;
  }

}
