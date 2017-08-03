import { Component, OnDestroy } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';
import { FlashMessagesService } from 'angular2-flash-messages';

export class NewUser {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnDestroy {

  newUser: NewUser = {
    username: '',
    email: '',
    password: ''
  };

  response: Subscription;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private flash: FlashMessagesService
  ) { }

  ngOnDestroy() {
  }

  onSubmit(form) {
    this.signupService.signup(this.newUser)
      .subscribe(
        data => {
          if (data.status === 200) {
            this.flash.show('Signup successful. Would you like to log in?', { cssClass: 'alert-success', timeout: 4000 });
            form.reset();
            this.router.navigate(['login']);
          }
        },
        err => {
          this.flash.show(`Signup unsuccessful: ${err}.`, { cssClass: 'alert-danger', timeout: 4000 });
        }
      )
   }
}
