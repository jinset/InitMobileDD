import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toast:any;

  constructor(public toastController: ToastController) { }

  async presentToast(msj) {
    this.toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    return this.toast.present();
  }

  // async presentToastWithOptions() {
  //   this.toast = await this.toastController.create({
  //     header: 'Toast header',
  //     message: 'Click to Close',
  //     position: 'top',
  //     buttons: [
  //       {
  //         side: 'start',
  //         icon: 'star',
  //         text: 'Favorite',
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       }, {
  //         text: 'Done',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   return this.toast.present();
  // }


}
