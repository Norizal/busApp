import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultdriverPage } from './resultdriver.page';

const routes: Routes = [
  {
    path: '',
    component: ResultdriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultdriverPageRoutingModule {}
