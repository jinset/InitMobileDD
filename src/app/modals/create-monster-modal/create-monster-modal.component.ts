import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-create-monster-modal',
  templateUrl: './create-monster-modal.component.html',
  styleUrls: ['./create-monster-modal.component.css']
})
export class CreateMonsterModalComponent {
  initMonster: number;
  numberMonster: number;
  nameMonster: string;
  healPointsMonster: number;

  constructor(public navParams: NavParams,public modalController: ModalController) { }

  async dismiss(action) {
    await this.modalController.dismiss(action)
  }

  created(){

    const data = {
      initMonster: this.initMonster,
      numberMonster: this.numberMonster,
      healPointsMonster: this.healPointsMonster,
      nameMonster: this.nameMonster
    }

    this.initMonster = null;
    this.numberMonster = null;
    this.healPointsMonster = null;
    this.nameMonster = null;

    this.dismiss(data);
  }

}
