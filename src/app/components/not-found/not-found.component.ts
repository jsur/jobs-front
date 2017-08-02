import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="text-center">
      <h1>404 Not Found</h1>
      <clr-icon class="sad-face" shape="sad-face"></clr-icon>
      <p>You may be lost. Go back <a routerLink="/">home</a>?</p>
    </div>
  `,
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {}
