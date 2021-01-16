import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyquestionPage } from './surveyquestion.page';

const routes: Routes = [
  {
    path: '',
    component: SurveyquestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyquestionPageRoutingModule {}
