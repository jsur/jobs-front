import { Component, AfterViewChecked } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements AfterViewChecked {

  constructor(
    private flashMessagesService: FlashMessagesService,
    private session: SessionService
  ) { }

  ngAfterViewChecked() {
    if (localStorage.getItem('flash-success')) {
      this.flashMessagesService.show(localStorage.getItem('flash-success'), { cssClass: 'flash flash-success', timeout: 1500 });
      localStorage.removeItem('flash-success');
    }
    if (localStorage.getItem('flash-error')) {
      this.flashMessagesService.show(localStorage.getItem('flash-error'), { cssClass: 'flash flash-error', timeout: 1500 });
      localStorage.removeItem('flash-error');
    }
  }

  logout() {
    this.session.logout();
  }

}
