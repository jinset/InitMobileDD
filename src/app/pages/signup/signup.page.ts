import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { NavController } from '@ionic/angular';
import { LoadingService } from '../../services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
  loading: any;

  // checkBtn:boolean = false;

  constructor(public navCtrl: NavController, private authService: AuthService,public loadingService: LoadingService, public toastService: ToastService) { }

  ngOnInit() {
    this.checkInputs();
  }

  checkInputs() {


  }


  async signup(email, password, nickName) {
    this.loading = this.loadingService.showLoading();

    await this.authService.register(email, password, nickName).then(data =>{
      this.toastService.presentToast(`Please, verify your email <b>${email}</b>`)

      this.loading = this.loadingService.hideLoading();
    }).catch(err =>{
      this.loading = this.loadingService.hideLoading();
      this.toastService.presentToast(err)

    });

  }
}
