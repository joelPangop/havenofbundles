import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BundleSetManagerPage } from './bundle-set-manager.page';

describe('BundleSetManagerPage', () => {
  let component: BundleSetManagerPage;
  let fixture: ComponentFixture<BundleSetManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleSetManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BundleSetManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
