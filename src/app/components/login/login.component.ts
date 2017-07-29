import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: Object = {};

  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  login() {
    this.session.login(this.user).subscribe(
      data => {
        this.router.navigate(['/dashboard']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
