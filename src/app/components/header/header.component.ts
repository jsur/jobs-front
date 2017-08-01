import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

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
    private router: Router
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

  editLead() {
    console.log('call service hello');
  }

}
