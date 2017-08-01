import { Component, AfterViewChecked } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent {

  constructor(
    public flashMessagesService: FlashMessagesService,
    public session: SessionService
  ) { }

  logout() {
    this.session.logout();
  }

}
