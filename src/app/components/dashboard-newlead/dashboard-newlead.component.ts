import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard-newlead',
  templateUrl: './dashboard-newlead.component.html',
  styleUrls: ['./dashboard-newlead.component.css']
})
export class DashboardNewleadComponent {
  @Output() modalClosed = new EventEmitter();

  newLead: Object = {};

  constructor() { }

  close() {
    this.modalClosed.emit();
  }

  submit(form: NgForm) {
    console.log(this.newLead);
    form.reset();
    this.modalClosed.emit();
  }

}
