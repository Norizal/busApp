import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveyquestionPageRoutingModule } from './surveyquestion-routing.module';

import { SurveyquestionPage } from './surveyquestion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyquestionPageRoutingModule
  ],
  declarations: [SurveyquestionPage]
})
export class SurveyquestionPageModule {}
