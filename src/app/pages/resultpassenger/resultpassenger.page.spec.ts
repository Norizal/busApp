import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultpassengerPage } from './resultpassenger.page';

describe('ResultpassengerPage', () => {
  let component: ResultpassengerPage;
  let fixture: ComponentFixture<ResultpassengerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultpassengerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultpassengerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
