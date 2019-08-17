import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingService } from '../../services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading: any;
  isChecked:boolean = false;
  email: string;
  password:string;

  constructor(
    private storage: Storage, 
    public navCtrl: NavController, 
    private authService: AuthService, 
    public loadingService: LoadingService, 
    public toastService: ToastService
    ) {

  }

  ngOnInit() {
  }

  /**
   * login function
   * @param email 
   * @param password 
   */
  async login(email, password) {
    this.loading = this.loadingService.showLoading();
    await this.authService.login(email, password)
      .then((data: any) => {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            email: data.email
          }
        };
        if(this.isChecked) this.storage.set('rememberUser', {email:email, password:password}); 
        this.loading = this.loadingService.hideLoading();
        this.navCtrl.navigateForward(['home'], navigationExtras);
      })
      .catch(err => {
        this.loading = this.loadingService.hideLoading();
        this.toastService.presentToast(err)
      })
  }
}
