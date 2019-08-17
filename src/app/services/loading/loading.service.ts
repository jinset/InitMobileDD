import { Injectable, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loading;

  constructor(public loadingController: LoadingController) {
  }

  async showLoading(){
    this.loading = await this.loadingController.create({
      spinner: "circles",
      message: `<span>Loading</span>`,
      translucent: true,
      // cssClass: 'custom-class custom-loading'
    });

    return await this.loading.present();
  }
  

  async hideLoading(){
    setTimeout(async () => {
    return await this.loadingController.dismiss();
  }, 500);
}


}
