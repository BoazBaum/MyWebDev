import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RTL_LANGUAGES } from './language-settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  // constructor(private translate: TranslateService) {
  //   this.translate.setDefaultLang('he');  // Default language
  // }

  // switchLanguage(language: string) {
  //   this.translate.use(language);
  //   this.adjustDirection(language);
  // }

  // adjustDirection(language: string) {
  //   const isRtl = RTL_LANGUAGES.includes(language);
  //   document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  // }
}
