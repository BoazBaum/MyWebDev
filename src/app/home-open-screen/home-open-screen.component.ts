import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  ElementRef,
  ViewChild
} 
from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SEOService } from '../services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-open-screen',
  templateUrl: './home-open-screen.component.html',
  styleUrls: ['./home-open-screen.component.css']
})
export class HomeOpenScreenComponent implements AfterViewInit {
  isFixed: boolean = false;

  // Flag to indicate if we’re in the browser
  private isBrowser: boolean;

  // We'll observe this section to trigger SEO updates
  @ViewChild('homeSection') homeSection!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private seoService: SEOService,
    private translate: TranslateService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Keep your scroll logic for fixing the navbar
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (!this.isBrowser) {
      return;
    }

    const scrollPosition = window.pageYOffset;
    const navbar = document.querySelector('.fixed-navbar') as HTMLElement;

    const screenWidth = window.innerWidth;
    let paddingTop = '70px';
    if (screenWidth <= 820 && screenWidth > 480) {
      paddingTop = '65px';
    } else if (screenWidth <= 480) {
      paddingTop = '60px';
    }

    if (scrollPosition > parseInt(paddingTop)) {
      this.isFixed = true;
      document.body.style.paddingTop = paddingTop;
      navbar?.classList.add('show');
    } else {
      this.isFixed = false;
      document.body.style.paddingTop = '0';
      navbar?.classList.remove('show');
    }
  }

  // Use IntersectionObserver to update SEO when the home section is in view
  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Once the section is visible, update SEO tags for this "home" screen
          if (this.translate.currentLang === 'he') {
            // Update SEO for Hebrew
            this.seoService.updateSEO(
              'בניית אתרים מקצועית - מסך הבית',
              'ברוכים הבאים למסך הבית שלנו, בו תוכלו לראות את שירותי בניית האתרים המקצועיים שלנו, המותאמים לצרכי העסק שלכם.',
              'בניית אתרים, עיצוב אתרים, פיתוח אתרים, אתרי אינטרנט',
              'בניית אתרים מקצועית - מסך הבית',
              'ברוכים הבאים למסך הבית של שירותי בניית האתרים המקצועיים שלנו.'
            );
          } else {
            // Update SEO for English
            this.seoService.updateSEO(
              'Professional Web Development - Home Screen',
              'Welcome to our home screen where you can explore our professional web development services tailored to your business needs.',
              'web development, responsive design, professional websites',
              'Professional Web Development - Home Screen',
              'Discover our bespoke web development services on our home screen.'
            );
          }
        }
      });
    }, { threshold: 0.5 });

    // Observe the element we tagged with #homeSection in the template
    observer.observe(this.homeSection.nativeElement);
  }
}
