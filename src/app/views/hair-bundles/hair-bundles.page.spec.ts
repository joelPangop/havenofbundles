import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HairBundlesPage } from './hair-bundles.page';

describe('HairBundlesPage', () => {
  let component: HairBundlesPage;
  let fixture: ComponentFixture<HairBundlesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HairBundlesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HairBundlesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
