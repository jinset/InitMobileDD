import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'
import { NavController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  nickName:string;
  email:string;
  password:string;
  confirmPassword:string;
  // checkBtn:boolean = false;

  constructor(public navCtrl: NavController, private authService: AuthService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.checkInputs();
  }

  checkInputs(){


  }


  async signup(email,password, nickName){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    let data = await this.authService.register(email,password, nickName);

    if(data === true){
      this.navCtrl.navigateForward('login');
      loading.dismiss();
    } else{
      console.log(data[1])
      loading.dismiss();

    }
  }
}
