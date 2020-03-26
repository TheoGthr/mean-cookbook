import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cb-app-root',
  template: `
    <cb-nav></cb-nav>
  `
})
export class AppComponent {
  title = 'mean-cookbook';

  constructor(private translateService: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translateService.setDefaultLang(translateService.getBrowserLang());
  }

  public setLang(lang: string) {
    this.translateService.use(lang);
  }
}
