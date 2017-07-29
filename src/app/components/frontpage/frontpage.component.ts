import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements AfterViewChecked {

  constructor(private flashMessagesService: FlashMessagesService) { }

  ngAfterViewChecked() {
    if (localStorage.getItem('flash-success')) {
      this.flashMessagesService.show(localStorage.getItem('flash-success'), { cssClass: 'flash-success' });
      localStorage.removeItem('flash-success');
    }
    if (localStorage.getItem('flash-error')) {
      this.flashMessagesService.show(localStorage.getItem('flash-error'), { cssClass: 'flash-error' });
      localStorage.removeItem('flash-error');
    }

  }

}
