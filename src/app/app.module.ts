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

import { CreateMonsterModalComponent } from './modals/create-monster-modal/create-monster-modal.component';
import { EditPjComponent } from './modals/edit-pj/edit-pj.component';
import { StoryComponent } from "./modals/story/story.component";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CreateMonsterModalComponent,
    EditPjComponent,
    StoryComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AppRoutingModule, 
    FormsModule, 
    IonicStorageModule.forRoot()    ,
    BrowserAnimationsModule, 
    NoopAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen, 
    AngularFireAuth,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateMonsterModalComponent,
    EditPjComponent,
    StoryComponent
  ]
})
export class AppModule { }
