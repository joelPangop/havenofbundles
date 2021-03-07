import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileBundleSetListPage } from './mobile-bundle-set-list.page';

describe('MobileBundleSetListPage', () => {
  let component: MobileBundleSetListPage;
  let fixture: ComponentFixture<MobileBundleSetListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileBundleSetListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileBundleSetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
