import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyquestionPage } from './surveyquestion.page';

describe('SurveyquestionPage', () => {
  let component: SurveyquestionPage;
  let fixture: ComponentFixture<SurveyquestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyquestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyquestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
