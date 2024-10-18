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
  
      // Change the condition as per your requirement (e.g., scroll position > 50)
      if (scrollPosition > 60) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    }
}
