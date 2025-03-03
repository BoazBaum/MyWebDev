import { Component } from '@angular/core';
import { RTL_LANGUAGES } from '../language-settings';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  selectedFlag: string;

  constructor(private translate: TranslateService) {
    
    const defaultLanguage = 'he'; // Your default language
    this.translate.setDefaultLang(defaultLanguage);
    this.adjustDirection(defaultLanguage);
    this.selectedFlag = '../../assets/israel-flag.png';
  }

  onLanguageSelect(language: string) {
    this.translate.use(language);
    this.adjustDirection(language);

    // Set flag based on selected language
    if (language === 'he') {
      this.selectedFlag = '../../assets/israel-flag.png';
    } else if (language === 'en') {
      this.selectedFlag = '../../assets/england-flag.png';
    }
    else{
      this.selectedFlag = '../../assets/Flag_of_Spain 1.png';
    }
  }
  adjustDirection(language: string) {
    const isRtl = RTL_LANGUAGES.includes(language);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    // Add or remove class to control the transform direction
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



}
