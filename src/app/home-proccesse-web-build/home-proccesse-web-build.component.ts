import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RTL_LANGUAGES } from '../language-settings';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home-proccesse-web-build',
  templateUrl: './home-proccesse-web-build.component.html',
  styleUrls: ['./home-proccesse-web-build.component.css']
})
export class HomeProccesseWebBuildComponent implements AfterViewInit {

  isRtl: boolean = true; // Default RTL
  private observer!: IntersectionObserver;
  private isBrowser: boolean;

  processSteps = [
    { img: '../../assets/Idea.png', alt: 'Idea', title: 'PROCESS.STEP1.TITLE', description: 'PROCESS.STEP1.DESCRIPTION' },
    { img: '../../assets/Mind Map.png', alt: 'Planning', title: 'PROCESS.STEP2.TITLE', description: 'PROCESS.STEP2.DESCRIPTION' },
    { img: '../../assets/Analyze on Screen.png', alt: 'Design', title: 'PROCESS.STEP3.TITLE', description: 'PROCESS.STEP3.DESCRIPTION' },
    { img: '../../assets/Building Website.png', alt: 'Development', title: 'PROCESS.STEP4.TITLE', description: 'PROCESS.STEP4.DESCRIPTION' },
    { img: '../../assets/Web Exploring.png', alt: 'Launch', title: 'PROCESS.STEP5.TITLE', description: 'PROCESS.STEP5.DESCRIPTION' }
  ];

  constructor(
    private translate: TranslateService,
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Check if we're in a browser environment:
    this.isBrowser = isPlatformBrowser(this.platformId);

    // You can still set isRtl for SSR, but any DOM calls must be guarded.
    const defaultLanguage = this.translate.currentLang || 'he';
    this.isRtl = RTL_LANGUAGES.includes(defaultLanguage);

    // For SSR, avoid calling `document` unless in browser:
    if (this.isBrowser) {
      this.adjustDirection(defaultLanguage);
    }

    // Listen for language changes:
    this.translate.onLangChange.subscribe(event => {
      this.isRtl = RTL_LANGUAGES.includes(event.lang);
      if (this.isBrowser) {
        this.adjustDirection(event.lang);
      }
    });
  }

  adjustDirection(language: string) {
    // Guard DOM usage:
    if (!this.isBrowser) {
      return;
    }
    document.documentElement.setAttribute('dir', this.isRtl ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', this.isRtl ? 'rtl' : 'ltr');
  }

  ngAfterViewInit(): void {
    // Guard IntersectionObserver and querySelectorAll:
    if (!this.isBrowser) {
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            (entry.target as HTMLElement).classList.add('show');
          }, index * 300);
        }
      });
    }, { threshold: 0.2 });

    const elements: NodeListOf<Element> = this.elRef.nativeElement.querySelectorAll('.hidden');
    elements.forEach((el: Element) => this.observer.observe(el));
  }
}
