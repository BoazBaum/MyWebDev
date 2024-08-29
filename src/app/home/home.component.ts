import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RTL_LANGUAGES } from '../language-settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './special-style.css']
})
export class HomeComponent {

  // You can define the observer as a class property.
  private observer: IntersectionObserver;

  constructor(private translate: TranslateService) {
    
     const defaultLanguage = 'he'; // Your default language
     this.translate.setDefaultLang(defaultLanguage);
     this.adjustDirection(defaultLanguage);

    // Initialize the IntersectionObserver in the constructor.
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('show');
        } else {
          (entry.target as HTMLElement).classList.remove('show');
        }
      });
    });
  }

  // onLanguageSelect(event: Event) {
  //   const selectedLanguage = (event.target as HTMLSelectElement).value;
  //   this.translate.use(selectedLanguage);
  //   this.adjustDirection(selectedLanguage);
  // }

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

  ngAfterViewInit(): void {
    // Select the elements and observe them after the view is initialized.
    const hiddenElements: NodeListOf<Element> = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el: Element) => this.observer.observe(el));
  }
}
