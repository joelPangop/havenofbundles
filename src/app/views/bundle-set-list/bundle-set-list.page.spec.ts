import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BundleSetListPage } from './bundle-set-list.page';

describe('BundleSetListPage', () => {
  let component: BundleSetListPage;
  let fixture: ComponentFixture<BundleSetListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BundleSetListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BundleSetListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
