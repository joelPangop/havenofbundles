import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileBundleSetPage } from './mobile-bundle-set.page';

describe('MobileBundleSetPage', () => {
  let component: MobileBundleSetPage;
  let fixture: ComponentFixture<MobileBundleSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBundleSetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileBundleSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
