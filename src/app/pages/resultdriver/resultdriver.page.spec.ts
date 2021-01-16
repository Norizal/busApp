import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultdriverPage } from './resultdriver.page';

describe('ResultdriverPage', () => {
  let component: ResultdriverPage;
  let fixture: ComponentFixture<ResultdriverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultdriverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultdriverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
