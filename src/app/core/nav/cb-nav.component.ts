import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cb-nav',
  styleUrls: ['./cb-nav.component.scss'],
  template: `
    <mat-sidenav-container fullscreen class="app-sidenav">
      <mat-sidenav
        mode="side"
        [opened]="true"
        id="sidenav"
      >
        <mat-toolbar class="cb-home" color='primary' z-elevation-8>
          <a routerLink="recipes">Cookbook</a>
        </mat-toolbar>
        <a routerLink="recipes" mat-button>Recipes</a>
      </mat-sidenav>
      <mat-sidenav-content class="sidenav-content">
        <mat-toolbar color='primary'>
        </mat-toolbar>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class CbNavComponent {
  public constructor(
    private router: Router
  ) {}
}
