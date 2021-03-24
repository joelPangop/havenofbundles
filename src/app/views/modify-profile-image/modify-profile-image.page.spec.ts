import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModifyProfileImagePage } from './modify-profile-image.page';

describe('ModifyProfileImagePage', () => {
  let component: ModifyProfileImagePage;
  let fixture: ComponentFixture<ModifyProfileImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProfileImagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyProfileImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
