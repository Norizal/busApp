import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultdriverPageRoutingModule } from './resultdriver-routing.module';

import { ResultdriverPage } from './resultdriver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultdriverPageRoutingModule
  ],
  declarations: [ResultdriverPage]
})
export class ResultdriverPageModule {}
