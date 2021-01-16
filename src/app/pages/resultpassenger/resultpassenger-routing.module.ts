import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultpassengerPage } from './resultpassenger.page';

const routes: Routes = [
  {
    path: '',
    component: ResultpassengerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultpassengerPageRoutingModule {}
