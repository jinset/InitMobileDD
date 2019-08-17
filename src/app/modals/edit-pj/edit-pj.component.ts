import { Component } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { PJService } from 'src/app/services/PJ/pj.service';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';


@Component({
  selector: 'app-edit-pj',
  templateUrl: './edit-pj.component.html',
  styleUrls: ['./edit-pj.component.scss'],
})
export class EditPjComponent {
  pj: any;
  itsNew: boolean;
  name:string;
  init:number;
  level:number;
  maxHp:number;
  uid:number;
  loading: any;

  constructor(public storage:Storage,public pJService:PJService,public navParams: NavParams,public modalController: ModalController, public loadingService: LoadingService) { 

  }

  ionViewWillEnter() {
    const pj= this.navParams.get('pj');
    if(pj){
      this.itsNew = false
      this.name = pj.character.name;
      this.init = pj.character.init;
      this.level = pj.character.level;
      this.maxHp = pj.character.maxHp;
      this.uid = pj.id;
    }else{
      this.itsNew = true
    }
  }

  async dismiss(action) {
    await this.modalController.dismiss(action)
  }

  async created(){
    this.loading = this.loadingService.showLoading();

    const userID = await this.storage.get('userUID');
    const storyID = await this.storage.get('storyID');
    const dataPJ = {
      name: this.name,
      init: this.init,
      monster: false,
      level: this.level,
      maxHp: this.maxHp,
      hp: this.maxHp,
    }

    if(this.itsNew){
      await this.pJService.createPJ(storyID, userID, dataPJ)
    }else{
      await this.pJService.updatePJ(storyID, userID, this.uid, dataPJ)
    }
    this.loading = this.loadingService.hideLoading();
    this.dismiss(true)
  }
  


}
