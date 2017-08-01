import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  individualLead: Object = {};

  constructor(
    private lead: LeadService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getLead(params['id']);
    });
  }

  getLead(id: string) {
    this.lead.getLead(id)
      .subscribe(
        data => {
          console.log(data);
          this.individualLead = data;
        },
        err => {
          console.log(err);
        }
      )
  }

}
