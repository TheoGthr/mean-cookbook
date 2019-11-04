import { Component } from '@angular/core';

@Component({
  selector: 'cb-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <cb-recipe-list></cb-recipe-list>
  `
})
export class AppComponent {
  title = 'mean-cookbook';
}
