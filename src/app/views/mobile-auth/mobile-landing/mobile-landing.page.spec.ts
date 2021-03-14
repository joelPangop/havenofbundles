import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileLandingPage } from './mobile-landing.page';

describe('MobileLandingPage', () => {
  let component: MobileLandingPage;
  let fixture: ComponentFixture<MobileLandingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLandingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileLandingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
