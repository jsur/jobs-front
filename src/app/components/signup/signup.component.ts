import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  newUser: Object = {};
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
    this.router.navigate(['/']);

   }

}
