import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileHomePage } from './mobile-home.page';

describe('MobileHomePage', () => {
  let component: MobileHomePage;
  let fixture: ComponentFixture<MobileHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
