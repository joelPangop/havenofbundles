import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileSignInPage } from './mobile-sign-in.page';

describe('MobileSignInPage', () => {
  let component: MobileSignInPage;
  let fixture: ComponentFixture<MobileSignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSignInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileSignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
