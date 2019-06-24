import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces/player';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { CreateMonsterModalComponent } from '../modals/create-monster-modal/create-monster-modal.component';


@Component({
  selector: 'app-init-ui',
  templateUrl: './init-ui.component.html',
  styleUrls: ['./init-ui.component.css']
})
export class InitUIComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  title = 'InitDM';
  monsterNumber: number = 0;



  pjList: Player[] = [
    // {
    //   name: "Jinset",
    //   init: 1,
    //   hp: 69,
    //   maxhp: 69,
    //   monster: false
    // }, {
    //   name: "Eudes",
    //   init: 2,
    //   hp: 57,
    //   maxhp: 57,
    //   monster: false
    // }, {
    //   name: "Nagini",
    //   init: 4,
    //   hp: 41,
    //   maxhp: 41,
    //   monster: false
    // }, {
    //   name: "Aremis",
    //   init: 5,
    //   hp: 54,
    //   maxhp: 54,
    //   monster: false
    // }, {
    //   name: "kanrra",
    //   init: 2,
    //   hp: 61,
    //   maxhp: 61,
    //   monster: false
    // },

    {
      name: "Bartra",
      init: 6,
      hp: 55,
      maxhp:55,
     monster: false
    },
    {
      name: "Drako",
      init: 4,
      hp: 35,
      maxhp:35,
     monster: false
    },{
      name: "Thyr",
      init: 7,
      hp: 76,
      maxhp:76,
     monster: false
    },{
      name: "Ira",
      init: 3,
      hp: 57,
      maxhp:57,
     monster: false
    },{
      name: "Tar",
      init: 4,
      hp: 45,
      maxhp:45,
     monster: false
    },{
      name: "Mere",
      init: 5,
      hp: 49,
      maxhp:49,
     monster: false
    },{
      name: "Ariel",
      init: 8,
      hp: 22,
      maxhp:22,
     monster: false
    }
  ];

  order: string = 'init';
  ngOnInit() {
    
  }

  damageEvent(item, damage) {
    let damageValue = Number(damage.value);
    let inputID = <HTMLInputElement>document.getElementById(damage.id);

    if (damageValue > 0) {
      item.hp = item.hp - damageValue;
      inputID.value = '';
    }
  }

  healEvent(item, heal) {
    let healValue = Number(heal.value);
    let inputID = <HTMLInputElement>document.getElementById(heal.id);

    if (healValue > 0) {
      item.hp = item.hp + Number(healValue);
      if (item.hp > item.maxhp) {
        item.hp = item.maxhp
      }
      inputID.value = '';
    }
  }

  addInit(item, init ) {
    let initValue = Number(init.value);
    let inputID = <HTMLInputElement>document.getElementById(init.id);

    if (initValue > 0 && initValue <= 20) {
      item.init = item.init + initValue;
      inputID.value = "";
    }
  }


  deleteElement(pj): void {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
      data: {name: pj}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pjList.forEach((item, index) =>{
          if(item.name === pj){
            this.pjList.splice(index,1);
          }
        })
      }
    });
  }

  openGeneratedMonsterModal(pj): void {
    const dialogRef = this.dialog.open(CreateMonsterModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.generatedMonster(result);
      }
    });
  }

  generatedMonster(newMonsters) {
    if(newMonsters.numberMonster === 1){
      let dice = Math.floor(Math.random() * 20) + 1;
      let monster = { name: newMonsters.nameMonster , init: dice + newMonsters.init, hp: newMonsters.hp, maxhp: newMonsters.hp, monster:true }

      this.pjList.push(monster)
    } else {
      for (let i = 0; i < newMonsters.numberMonster; i++) {
        let name =  "monster " + this.monsterNumber++;
        let dice = Math.floor(Math.random() * 20) + 1;
        let monster = { name:name , init: dice + newMonsters.init, hp: newMonsters.hp, maxhp: newMonsters.hp, monster:true }

        this.pjList.push(monster)
      }
    }
  }

}
