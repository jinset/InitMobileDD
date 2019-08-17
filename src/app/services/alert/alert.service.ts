import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert:any;
  constructor(public alertController:AlertController) { }

  async showAlert(header, msj){
    return new Promise(async (resolve,reject) =>{
      this.alert = await this.alertController.create({
        header: header,
        message: msj,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve (false);
            }
          }, {
            text: 'Accept',
            handler: () => {
              resolve(true)
            }
          }
        ]
      });
      await this.alert.present();
    })
  }


}
