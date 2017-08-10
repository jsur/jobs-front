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

  toggleFavorite(e) {
    e.preventDefault();
    e.stopPropagation();
    const id = e.target.parentNode.id ? e.target.parentNode.id : e.target.parentNode.parentNode.id;
    console.log(id);
    this.leadservice.toggleFavorite(id)
      .subscribe(
        data => {
          console.log('toggleFavorite data:', data);
          this.leadservice.announceNewLead();
        },
        err => {
          console.log(err);
        }
      )
  }

}
