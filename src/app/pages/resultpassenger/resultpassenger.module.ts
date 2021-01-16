import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultpassengerPageRoutingModule } from './resultpassenger-routing.module';

import { ResultpassengerPage } from './resultpassenger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultpassengerPageRoutingModule
  ],
  declarations: [ResultpassengerPage]
})
export class ResultpassengerPageModule {}
