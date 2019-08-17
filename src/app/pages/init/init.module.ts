import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InitPage } from './init.page';
import { OrderModule } from 'ngx-order-pipe';

const routes: Routes = [
  {
    path: '',
    component: InitPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InitPage]
})
export class InitPageModule {}
