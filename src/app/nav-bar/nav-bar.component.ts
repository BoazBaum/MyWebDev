import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RTL_LANGUAGES } from '../language-settings';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  selectedFlag: string | undefined;
  private isBrowser: boolean;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if we’re running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);

    // If we are in the browser, we can safely call localStorage
    let savedLanguage = 'he'; // default
    if (this.isBrowser) {
      const storedLang = localStorage.getItem('userLanguage');
      if (storedLang) {
        savedLanguage = storedLang;
      }
    }

    // Initialize translation
    this.translate.setDefaultLang('he');
    this.translate.use(savedLanguage);

    // Adjust direction and flags in the browser only
    if (this.isBrowser) {
      this.adjustDirection(savedLanguage);
      this.setFlag(savedLanguage);
    }
  }

  onLanguageSelect(language: string) {
    this.translate.use(language);

    if (this.isBrowser) {
      this.adjustDirection(language);
      this.setFlag(language);
      localStorage.setItem('userLanguage', language);
    }
  }

  adjustDirection(language: string) {
    if (!this.isBrowser) {
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

  setFlag(language: string) {
    // Safe to run in SSR, as this doesn't call document/window/localStorage
    if (language === 'he') {
      this.selectedFlag = '../../assets/israel-flag.png';
    } else if (language === 'en') {
      this.selectedFlag = '../../assets/england-flag.png';
    } else {
      this.selectedFlag = '../../assets/Flag_of_Spain 1.png';
    }
  }

  scrollToSection(sectionId: string): void {
    // Guard again
    if (!this.isBrowser) {
      return;
    }

    // 1. Perform the smooth scroll
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // 2. Uncheck the #chk1 box to close the menu
    const menuCheckbox = document.getElementById('chk1') as HTMLInputElement;
    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  }
}
