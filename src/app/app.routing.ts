import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
  //  Redirect from path '' home page to about page
  { path: '', component: FrontpageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

export const appRouting = RouterModule.forRoot(appRoutes);
