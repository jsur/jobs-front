import { Component, Input, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';

@Component({
  selector: 'app-dashboard-leadcard',
  templateUrl: './dashboard-leadcard.component.html',
  styleUrls: ['./dashboard-leadcard.component.css']
})
export class DashboardLeadcardComponent implements OnInit {
  @Input() leads;
  pattern = '';

  constructor(private leadservice: LeadService) {

    this.leadservice.searchTerm$
      .debounceTime(250)
      .subscribe(
        data => {
          this.pattern = data.toString();
        },
        err => {
          console.log(err);
        }
      )
  }

  ngOnInit() {
  }

}
