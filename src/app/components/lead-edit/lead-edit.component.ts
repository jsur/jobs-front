import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-lead-edit',
  templateUrl: './lead-edit.component.html',
  styleUrls: ['./lead-edit.component.css']
})
export class LeadEditComponent implements OnChanges {
  @Output() modalClosed = new EventEmitter();
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

  ngOnChanges() {

  }

  close() {
    this.modalClosed.emit();
  }

  submitEdit() {
    this.leads.updateLead(this.editableLead._id, this.editableLead)
      .subscribe(
        data => {
          this.modalClosed.emit();
        },
        err => {
          console.log(err);
        }
      );
  }

}
