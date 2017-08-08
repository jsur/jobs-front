import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  newLeadActive = false;

  constructor() { }

  newLead() {
    this.newLeadActive = !this.newLeadActive;
  }

  onModalClosed() {
    this.newLeadActive = false;
  }

}
