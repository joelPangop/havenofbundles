import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileBundleSetManagerPage } from './mobile-bundle-set-manager.page';

describe('MobileBundleSetManagerPage', () => {
  let component: MobileBundleSetManagerPage;
  let fixture: ComponentFixture<MobileBundleSetManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBundleSetManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileBundleSetManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
