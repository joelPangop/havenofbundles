import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddEditProductPage } from './add-edit-product.page';

describe('AddEditProductPage', () => {
  let component: AddEditProductPage;
  let fixture: ComponentFixture<AddEditProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
