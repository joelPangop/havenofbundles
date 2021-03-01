import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryLinksPage } from './category-links.page';

describe('CategoryLinksPage', () => {
  let component: CategoryLinksPage;
  let fixture: ComponentFixture<CategoryLinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLinksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryLinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
