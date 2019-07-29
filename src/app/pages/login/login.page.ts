import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, private authService: AuthService, public loadingController: LoadingController) { 

  }

  ngOnInit() {
  }

  async goToSignup(email, password) {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();
    let data = await this.authService.login("v@v.com", "123456");

    // let data = await this.authService.login(email, password);
    if (data[0]) {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          email: data[1].email
        }
      };
      this.navCtrl.navigateForward(['home'], navigationExtras);
      loading.dismiss();
    } else {
      console.log(data[1])
      loading.dismiss();
    }
  }


}
