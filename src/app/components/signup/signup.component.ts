import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  newUser: Object = {};
  success: Object;

  constructor(
    private signupService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this.success = this.signupService.signup(this.newUser);
    form.reset();
    if (this.success) {
      this.router.navigate(['/']);
    }

   }

}
