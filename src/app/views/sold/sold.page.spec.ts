import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoldPage } from './sold.page';

describe('SoldPage', () => {
  let component: SoldPage;
  let fixture: ComponentFixture<SoldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
