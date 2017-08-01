import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent implements OnInit {
  @Output() modalClosed = new EventEmitter();
  @Input() editableLead;

  constructor() { }

  ngOnInit() {
  }

  close(form: NgForm) {
    this.modalClosed.emit();
  }

  submitEdit(form: NgForm) {
    console.log(form);
  }

}
