import { Component } from '@angular/core';
import { NavParams,ModalController,LoadingController } from '@ionic/angular';
import { PJService } from 'src/app/services/PJ/pj.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-pj',
  templateUrl: './edit-pj.component.html',
  styleUrls: ['./edit-pj.component.scss'],
})
export class EditPjComponent {
  pj: any;
  event: string;
  name:string;
  init:number;
  level:number;
  maxHp:number;
  uid:number;
  constructor(public storage:Storage,public pJService:PJService,public navParams: NavParams,public modalController: ModalController, public loadingController: LoadingController) { 

  }

  ionViewWillEnter() {
    let pj= this.navParams.get('pj');
    if(pj){
      this.event = "edit"
      this.name = pj.character.name;
      this.init = pj.character.init;
      this.level = pj.character.level;
      this.maxHp = pj.character.maxHp;
      this.uid = pj.id;
    }else{
      this.event = "new"
    }
  }

  async dismiss(action) {
    await this.modalController.dismiss(action)
  }

  async created(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    let userID = "";
    let storyID = "";

    userID = await this.storage.get('userUID');

    storyID = await this.storage.get('storyID')
    
    let dataPJ = {
      name: this.name,
      init: this.init,
      monster: false,
      level: this.level,
      maxHp: this.maxHp,
      hp: this.maxHp,
    }

    if(this.event === "new"){
      await this.pJService.createPJ(storyID, userID, dataPJ)
    }else{
      await this.pJService.updatePJ(storyID, userID,  this.uid, dataPJ)

    }

    loading.dismiss();
    this.dismiss(true)

  }


}
