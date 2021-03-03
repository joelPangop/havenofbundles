import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileAddEditBundleSetPage } from './mobile-add-edit-bundle-set.page';

describe('MobileAddEditBundleSetPage', () => {
  let component: MobileAddEditBundleSetPage;
  let fixture: ComponentFixture<MobileAddEditBundleSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAddEditBundleSetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileAddEditBundleSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
