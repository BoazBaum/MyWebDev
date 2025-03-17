import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RTL_LANGUAGES } from '../language-settings';

import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const defaultLanguage = 'he';
    this.translate.setDefaultLang(defaultLanguage);

    // Only adjust direction in the browser:
    if (isPlatformBrowser(this.platformId)) {
      this.adjustDirection(defaultLanguage);
    }
  }

  adjustDirection(language: string) {
    // Guard all DOM calls with an isPlatformBrowser check:
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const isRtl = RTL_LANGUAGES.includes(language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el: Element) => {
      if (isRtl) {
        el.classList.add('rtl-transform');
        el.classList.remove('ltr-transform');
      } else {
        el.classList.add('ltr-transform');
        el.classList.remove('rtl-transform');
      }
    });
  }

  ngAfterViewInit(): void {
    // Same guard here to avoid accessing document in SSR:
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // If you need IntersectionObserver or any other DOM manipulation:
    // const hiddenElements = document.querySelectorAll('.hidden');
    // hiddenElements.forEach((el: Element) => this.observer.observe(el));
  }
}
