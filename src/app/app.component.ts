import { Component, AfterContentInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from './services/auth/auth.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterContentInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    public toastService: ToastService,
    private authService: AuthService,
    public navCtrl: NavController

  ) {
    this.initializeApp();
  }

  async ngAfterContentInit() {
    this.storage.get('rememberUser').then(async data => {
      if (data) {
        await this.authService.login(data.email, data.password)
          .then((data: any) => {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                email: data.email
              }
            };
            this.navCtrl.navigateForward(['home'], navigationExtras);
          })
          .catch(err => {
            this.toastService.presentToast(err);
            this.navCtrl.navigateForward('login');
          })
      } else {
        this.navCtrl.navigateForward('login');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
