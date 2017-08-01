import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent implements OnInit {
  @Output() modalClosed = new EventEmitter();
  @Input() editableLead;

  constructor(
    private leads: LeadService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.modalClosed.emit();
  }

  submitEdit() {
    this.leads.updateLead(this.editableLead._id, this.editableLead)
      .subscribe(
        data => {
          this.leads.announceNewLead(data.lead);
        },
        err => {
          console.log(err);
        }
      );
    this.modalClosed.emit();
  }

}
