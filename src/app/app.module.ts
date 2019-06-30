import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OrderModule } from 'ngx-order-pipe';
import { MatDialogModule } from '@angular/material/dialog';

import { InitUIComponent } from './init-ui/init-ui.component';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { CreateMonsterModalComponent } from './modals/create-monster-modal/create-monster-modal.component';

@NgModule({
  declarations: [AppComponent, InitUIComponent,
    ConfirmModalComponent,
    CreateMonsterModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, OrderModule,
    AppRoutingModule, FormsModule,
    BrowserAnimationsModule, NoopAnimationsModule, MatDialogModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent, CreateMonsterModalComponent]
})
export class AppModule { }
