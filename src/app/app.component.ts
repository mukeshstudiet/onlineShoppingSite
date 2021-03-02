import { Component } from '@angular/core';

@Component({
  selector: 'pm-root',
  template: `
    <nav class='navbar navbar-expand navbar-light bg-light'>
        <ul class='nav nav-pills'>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/welcome']">Home</a></li>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/products']"> Products </a></li>
          <li><a class='nav-link' routerLinkActive='active' [routerLink]="['/orders']"> Orders </a></li>
          <li ><a class='nav-link' routerLinkActive='active' [routerLink]="['/cart']"> Cart </a></li>
        </ul>
    </nav>
    <div class='container'>
      <router-outlet></router-outlet>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Online Shopping Site Assignment';
}
