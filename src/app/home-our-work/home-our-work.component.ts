import { Component } from '@angular/core';

@Component({
  selector: 'app-home-our-work',
  templateUrl: './home-our-work.component.html',
  styleUrls: ['./home-our-work.component.css']
})
export class HomeOurWorkComponent {
  portfolioSites = [
    {
      title: 'OUR_WORK.SITE1.TITLE',
      description: 'OUR_WORK.SITE1.DESCRIPTION',
      screenshot: '../../assets/Computera site.png',
      link: 'https://computera.fwh.is/'
    },
    {
      title: 'OUR_WORK.SITE2.TITLE',
      description: 'OUR_WORK.SITE2.DESCRIPTION',
      screenshot: '../../assets/woocomerce site.png',
      link: 'https://mdesign4u.co.il/'
    },
    {
      title: 'OUR_WORK.SITE3.TITLE',
      description: 'OUR_WORK.SITE3.DESCRIPTION',
      screenshot: '../../assets/DJ site.png',
      link: 'https://dj-boaz.netlify.app/'
    },
    {
      title: 'OUR_WORK.SITE4.TITLE',
      description: 'OUR_WORK.SITE4.DESCRIPTION',
      screenshot: '../../assets/Food site.png',
      link: 'https://fresh-food-store.netlify.app'
    },
    {
      title: 'OUR_WORK.SITE5.TITLE',
      description: 'OUR_WORK.SITE5.DESCRIPTION',
      screenshot: '../../assets/rent site.png',
      link: 'https://realestateagency.fwh.is/'
    }
  ];

}


