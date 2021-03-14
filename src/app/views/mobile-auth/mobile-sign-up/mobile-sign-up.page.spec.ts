import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileSignUpPage } from './mobile-sign-up.page';

describe('MobileSignUpPage', () => {
  let component: MobileSignUpPage;
  let fixture: ComponentFixture<MobileSignUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSignUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSignUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
