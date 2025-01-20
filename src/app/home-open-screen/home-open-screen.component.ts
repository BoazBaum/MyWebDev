import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home-open-screen',
  templateUrl: './home-open-screen.component.html',
  styleUrls: ['./home-open-screen.component.css']
})
export class HomeOpenScreenComponent {

    // Flag to track if the navbar is fixed
    isFixed: boolean = false;

    // Listen for the window scroll event
    @HostListener('window:scroll', [])
    onWindowScroll() {
      const scrollPosition = window.pageYOffset;
      const navbar = document.querySelector('.fixed-navbar') as HTMLElement;

      const screenWidth = window.innerWidth;
      let paddingTop = '90px' 
      if(screenWidth <= 820 && screenWidth > 480)
      {
        paddingTop = '80px'
      }
      else if(screenWidth <= 480)
      {
        paddingTop = '60px'
      }

      // Change the condition as per your requirement (e.g., scroll position > 50)
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
}
