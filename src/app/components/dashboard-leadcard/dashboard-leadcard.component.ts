import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-leadcard',
  templateUrl: './dashboard-leadcard.component.html',
  styleUrls: ['./dashboard-leadcard.component.css']
})
export class DashboardLeadcardComponent implements OnInit {
  @Input() leads;

  constructor() { }

  ngOnInit() {
  }

}
