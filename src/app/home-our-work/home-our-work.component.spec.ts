import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOurWorkComponent } from './home-our-work.component';

describe('HomeOurWorkComponent', () => {
  let component: HomeOurWorkComponent;
  let fixture: ComponentFixture<HomeOurWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeOurWorkComponent]
    });
    fixture = TestBed.createComponent(HomeOurWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
