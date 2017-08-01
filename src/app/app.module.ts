import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ClarityModule } from 'clarity-angular';

import { appRouting } from './app.routing';

import { SessionService } from './services/session.service';
import { SignupService } from './services/signup.service';
import { LeadService } from './services/lead.service';
import { ExternalService } from './services/external.service';
import { DashboardColumnsComponent } from './components/dashboard-columns/dashboard-columns.component';
import { DashboardLeadcardComponent } from './components/dashboard-leadcard/dashboard-leadcard.component';
import { DashboardNewleadComponent } from './components/dashboard-newlead/dashboard-newlead.component';
import { LeadComponent } from './components/lead/lead.component';
import { HeaderComponent } from './components/header/header.component';
import { LeadEditComponent } from './components/lead-edit/lead-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    NotFoundComponent,
    FrontpageComponent,
    DashboardColumnsComponent,
    DashboardLeadcardComponent,
    DashboardNewleadComponent,
    LeadComponent,
    HeaderComponent,
    LeadEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    ClarityModule.forRoot(),
    appRouting
  ],
  providers: [
    SessionService,
    SignupService,
    LeadService,
    ExternalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
