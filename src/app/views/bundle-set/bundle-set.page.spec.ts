import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BundleSetPage } from './bundle-set.page';

describe('BundleSetPage', () => {
  let component: BundleSetPage;
  let fixture: ComponentFixture<BundleSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleSetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BundleSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
