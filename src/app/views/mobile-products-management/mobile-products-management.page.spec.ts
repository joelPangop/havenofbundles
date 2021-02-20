import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileProductsManagementPage } from './mobile-products-management.page';

describe('MobileProductsManagementPage', () => {
  let component: MobileProductsManagementPage;
  let fixture: ComponentFixture<MobileProductsManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileProductsManagementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileProductsManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
