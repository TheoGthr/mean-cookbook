import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-nav',
  styleUrls: ['./cb-nav.component.scss'],
  template: `
    <mat-sidenav-container fullscreen class="app-sidenav">
      <mat-sidenav-content class="sidenav-content">
        <mat-toolbar color='primary'>
          <h1>My Cookbook</h1>
        </mat-toolbar>
        <div id="routes">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class CbNavComponent {
  public constructor(
    private router: Router
  ) {}
}
