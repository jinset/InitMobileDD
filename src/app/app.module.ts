import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';


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
import { EditPjComponent } from './modals/edit-pj/edit-pj.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";

import { environment } from '../environments/environment';







@NgModule({
  declarations: [AppComponent, InitUIComponent,
    ConfirmModalComponent,
    CreateMonsterModalComponent,EditPjComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, OrderModule,
    AppRoutingModule, FormsModule,    IonicStorageModule.forRoot()    ,
    BrowserAnimationsModule, NoopAnimationsModule, MatDialogModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen, AngularFireAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent, CreateMonsterModalComponent,EditPjComponent]
})
export class AppModule { }
