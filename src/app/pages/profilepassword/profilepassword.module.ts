import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilepasswordPageRoutingModule } from './profilepassword-routing.module';

import { ProfilepasswordPage } from './profilepassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilepasswordPageRoutingModule
  ],
  declarations: [ProfilepasswordPage]
})
export class ProfilepasswordPageModule {}
