import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { SignupService } from '../../services/signup.service';
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
    private signup: SignupService,
    private router: Router,
    public flash: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  login() {
    this.session.login(this.user)
      .subscribe(
        data => {
          this.router.navigate(['dashboard']);
        },
        err => {
          this.flash.show(`Login unsuccessful: ${err}.`, { cssClass: 'alert-danger', timeout: 4000 });
        }
    )
  }

}
