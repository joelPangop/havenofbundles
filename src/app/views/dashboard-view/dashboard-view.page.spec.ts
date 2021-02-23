import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashboardViewPage } from './dashboard-view.page';

describe('DashboardViewPage', () => {
  let component: DashboardViewPage;
  let fixture: ComponentFixture<DashboardViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
