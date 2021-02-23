import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileHairBundlesPage } from './mobile-hair-bundles.page';

describe('MobileHairBundlesPage', () => {
  let component: MobileHairBundlesPage;
  let fixture: ComponentFixture<MobileHairBundlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileHairBundlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileHairBundlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
