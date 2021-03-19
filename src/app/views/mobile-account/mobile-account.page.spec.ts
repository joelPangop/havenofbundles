import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileAccountPage } from './mobile-account.page';

describe('MobileAccountPage', () => {
  let component: MobileAccountPage;
  let fixture: ComponentFixture<MobileAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
