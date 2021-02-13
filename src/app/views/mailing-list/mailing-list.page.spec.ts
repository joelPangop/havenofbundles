import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailingListPage } from './mailing-list.page';

describe('MailingListPage', () => {
  let component: MailingListPage;
  let fixture: ComponentFixture<MailingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
