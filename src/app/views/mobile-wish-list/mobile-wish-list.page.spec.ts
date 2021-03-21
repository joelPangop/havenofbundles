import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileWishListPage } from './mobile-wish-list.page';

describe('MobileWishListPage', () => {
  let component: MobileWishListPage;
  let fixture: ComponentFixture<MobileWishListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWishListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileWishListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
