import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RateViewPage } from './rate-view.page';

describe('RateViewPage', () => {
  let component: RateViewPage;
  let fixture: ComponentFixture<RateViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RateViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
