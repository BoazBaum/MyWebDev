import { Component } from '@angular/core';
import { RTL_LANGUAGES } from '../language-settings';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  selectedFlag: string | undefined;

  constructor(private translate: TranslateService) {
    // Attempt to retrieve the last-used language from localStorage
    const savedLanguage = localStorage.getItem('userLanguage');
    
    // If there is a saved language, use it.
    // Otherwise, use your default (he).
    if (savedLanguage) {
      this.translate.use(savedLanguage);
      this.adjustDirection(savedLanguage);
      this.setFlag(savedLanguage);
    } else {
      const defaultLanguage = 'he'; // or whatever default you want
      this.translate.setDefaultLang(defaultLanguage);
      this.adjustDirection(defaultLanguage);
      this.setFlag(defaultLanguage);
    }
  }

  onLanguageSelect(language: string) {
    // Use the chosen language
    this.translate.use(language);
    this.adjustDirection(language);
    this.setFlag(language);

    // Persist the user's choice in localStorage
    localStorage.setItem('userLanguage', language);
  }

  adjustDirection(language: string) {
    const isRtl = RTL_LANGUAGES.includes(language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el: Element) => {
      if (isRtl) {
        (el as HTMLElement).classList.add('rtl-transform');
        (el as HTMLElement).classList.remove('ltr-transform');
      } else {
        (el as HTMLElement).classList.add('ltr-transform');
        (el as HTMLElement).classList.remove('rtl-transform');
      }
    });
  }

  setFlag(language: string) {
    if (language === 'he') {
      this.selectedFlag = '../../assets/israel-flag.png';
    } else if (language === 'en') {
      this.selectedFlag = '../../assets/england-flag.png';
    } else {
      this.selectedFlag = '../../assets/Flag_of_Spain 1.png';
    }
  }

  scrollToSection(sectionId: string): void {
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
