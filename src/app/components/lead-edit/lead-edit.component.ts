import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent {
  @Output() modalClosed = new EventEmitter();
  @Output() leadUpdated = new EventEmitter();
  @Input() editableLead;

  statusOpts = {
    contacted: 'contacted',
    replyreceived: 'replyreceived',
    interview: 'interview',
    done: 'done'
  }

  constructor(
    private leads: LeadService,
    private router: Router
  ) { }

  close() {
    this.modalClosed.emit();
  }

  submitEdit() {
    this.leads.updateLead(this.editableLead._id, this.editableLead)
      .subscribe(
        data => {
          this.modalClosed.emit();
          this.leadUpdated.emit();
          this.leads.announceAlarmChange();
        },
        err => {
          console.log(err);
        }
      );
  }

}
