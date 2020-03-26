import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cb-nav',
  styleUrls: ['./cb-nav.component.scss'],
  template: `
    <mat-sidenav-container fullscreen class="app-sidenav">
      <mat-sidenav-content class="sidenav-content">
        <mat-toolbar color="primary" class="mat-elevation-z4">
          <a routerLink="/" class="logo">{{ 'common.cookbook' | translate }}</a>
          <div class="language-btn">
            <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Languages" id="languages">
              <mat-icon>language</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button
                mat-menu-item
                (click)="setLang('fr')"
              >
                {{ 'common.lang_fr' | translate }}
              </button>
              <button
                mat-menu-item
                (click)="setLang('en')"
              >
                {{ 'common.lang_en' | translate }}
              </button>
            </mat-menu>
          </div>
        </mat-toolbar>
        <div id="routes">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class CbNavComponent {
  constructor(private translateService: TranslateService) {}

  public setLang(lang: string) {
    this.translateService.use(lang);
  }
}
