import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilepasswordPage } from './profilepassword.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilepasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilepasswordPageRoutingModule {}
