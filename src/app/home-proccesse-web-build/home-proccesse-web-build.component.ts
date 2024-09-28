import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-proccesse-web-build',
  templateUrl: './home-proccesse-web-build.component.html',
  styleUrls: ['./home-proccesse-web-build.component.css']
})
export class HomeProccesseWebBuildComponent {

  private observer: IntersectionObserver;

  constructor(private translate: TranslateService) {
    
    const defaultLanguage = 'he'; // Your default language
    this.translate.setDefaultLang(defaultLanguage);

   //Initialize the IntersectionObserver in the constructor.
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
  

 ngAfterViewInit(): void {
  // Select the elements and observe them after the view is initialized.
  const hiddenElements: NodeListOf<Element> = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el: Element) => this.observer.observe(el));
}

}
