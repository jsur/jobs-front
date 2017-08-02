import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { FlashMessagesService } from 'angular2-flash-messages';

export class LoggedUser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: LoggedUser = {
    username: '',
    password: ''
  };

  constructor(
    private session: SessionService,
    private router: Router,
    public flash: FlashMessagesService
  ) { }

  ngOnInit() {
    this.flash.show('Dashboard text!', { cssClass: 'alert-danger', timeout: 500000 });
  }

  login() {
    this.session.login(this.user).subscribe(
      data => {
        this.router.navigate(['dashboard']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
