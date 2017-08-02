import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

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
export class SignupComponent implements OnInit {

  newUser: NewUser = {
    username: '',
    email: '',
    password: ''
  };

  response: Object;

  constructor(
    private signupService: SignupService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.response = this.signupService.signup(this.newUser);
    form.reset();
    this.router.navigate(['/login']);

   }

}
