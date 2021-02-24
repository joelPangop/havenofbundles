import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterViewPage } from './filter-view.page';

describe('FilterViewPage', () => {
  let component: FilterViewPage;
  let fixture: ComponentFixture<FilterViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
