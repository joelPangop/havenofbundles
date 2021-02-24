import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileProductViewPage } from './mobile-product-view.page';

describe('MobileProductViewPage', () => {
  let component: MobileProductViewPage;
  let fixture: ComponentFixture<MobileProductViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileProductViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileProductViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
