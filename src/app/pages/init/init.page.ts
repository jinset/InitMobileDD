import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PJService } from 'src/app/services/PJ/pj.service';
import { AlertService } from '../../services/alert/alert.service';
import { CreateMonsterModalComponent } from '../../modals/create-monster-modal/create-monster-modal.component';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {
  pjsList: any = [];
  monsterNumber: number = 1;
  order: string = 'init';
  loading: any;
  initID:string;

  constructor(
    public loadingService: LoadingService,    
    public navCtrl: NavController, 
    private storage: Storage, 
    private pJService: PJService,
    public alertService:AlertService,
    public modalController: ModalController) {
  }

  async ngOnInit() {
    await this.getPjs();
  }

  async getPjs() {
    let list: any
    this.pjsList = [];
    this.loading = this.loadingService.showLoading();

    const userID = await this.storage.get('userUID');
    const storyID = await this.storage.get('storyID');
    this.initID= userID + storyID;
    list = await this.storage.get(this.initID);

    if(list){
      this.pjsList = list;

    } else {
      list = await this.pJService.getPJsByStory(storyID, userID);
      list.forEach(element => {
        this.pjsList.push(element.character)
      });
    }
    this.loading = this.loadingService.hideLoading();
  }



  damageEvent(item, damage) {
    const damageValue = Number(damage.value);
    let inputID = <HTMLInputElement>document.getElementById(damage.el.id);

    if (damageValue > 0) {
      item.hp = item.hp - damageValue;
      inputID.value = '';
      this.storage.set(this.initID, this.pjsList)
    }

  }

  healEvent(item, heal) {
    const healValue = Number(heal.value);
    let inputID = <HTMLInputElement>document.getElementById(heal.el.id);

    if (healValue > 0) {
      item.hp = item.hp + Number(healValue);
      if (item.hp > item.maxHp) {
        item.hp = item.maxHp
      }
      inputID.value = '';
      this.storage.set(this.initID, this.pjsList)

    }
  }

  addInit(item, init) {
    const initValue = Number(init.value);
    let inputID = <HTMLInputElement>document.getElementById(init.el.id);

    if (initValue > 0 && initValue <= 20) {
      item.init = item.init + initValue;
      inputID.value = "";
      this.storage.set(this.initID, this.pjsList)

    }

  }


  async deleteElement(pj) {
    await this.alertService.showAlert("Are you sure?",`Do you want to delete <strong>${pj}</strong>?, This process cannot be undone`).then(data =>{
      if (data) {
        this.pjsList.forEach((item, index) => {
          if (item.name === pj) {
            this.pjsList.splice(index, 1);
          }
        })
        this.storage.set(this.initID, this.pjsList)

      }
    })
  }

  async openGeneratedMonsterModal() {
    const modal = await this.modalController.create({
      component: CreateMonsterModalComponent
    });

    modal.onDidDismiss().then(data => {
      if(data.data){
        this.generatedMonster(data.data);
      }
    })
    await modal.present();
  }



  generatedMonster(newMonsters) {
    if (newMonsters.numberMonster === 1) {
      const dice = Math.floor(Math.random() * 20) + 1;
      const monster = { 
        name: newMonsters.nameMonster, 
        init: dice + newMonsters.initMonster, 
        hp: newMonsters.healPointsMonster, 
        maxHp: newMonsters.healPointsMonster, 
        monster: true }

      this.pjsList.push(monster)

    } else {
      for (let i = 0; i < newMonsters.numberMonster; i++) {
        const name = newMonsters.nameMonster + " " + this.monsterNumber++;
        const dice = Math.floor(Math.random() * 20) + 1;
        const monster = { 
          name: name, 
          init: dice + newMonsters.initMonster, 
          hp: newMonsters.healPointsMonster, 
          maxHp: newMonsters.healPointsMonster, 
          monster: true }
        this.pjsList.push(monster)
      }
    }
    this.storage.set(this.initID, this.pjsList)

  }

}
