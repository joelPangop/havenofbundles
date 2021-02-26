import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColorViewPage } from './color-view.page';

describe('ColorViewPage', () => {
  let component: ColorViewPage;
  let fixture: ComponentFixture<ColorViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColorViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
