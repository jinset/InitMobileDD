import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces/player';
import { DatPj } from '../data/datPJ';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { CreateMonsterModalComponent } from '../modals/create-monster-modal/create-monster-modal.component';



@Component({
  selector: 'app-init-ui',
  templateUrl: './init-ui.component.html',
  styleUrls: ['./init-ui.component.css']
})
export class InitUIComponent implements OnInit {
  storyList: DatPj = new DatPj();

  constructor(public dialog: MatDialog) {

  }
  monsterNumber: number = 1;
  selectStory: string;
  pjList;
  order: string = 'init';

  ngOnInit() {
  }

  optionsFn() {
    this.loadListPJ(this.storyList);
  }

  resetFunction() {
    let originalList: DatPj = new DatPj();

    this.loadListPJ(originalList);

  }

  loadListPJ(listPj) {
    listPj.list.forEach(data => {
      if (data.name === this.selectStory) {
        this.pjList = data.players;
      }
    })

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

  addInit(item, init) {
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
      data: { name: pj }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pjList.forEach((item, index) => {
          if (item.name === pj) {
            this.pjList.splice(index, 1);
          }
        })
      }
    });
  }

  openGeneratedMonsterModal(): void {
    const dialogRef = this.dialog.open(CreateMonsterModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.generatedMonster(result);
      }
    });
  }



  generatedMonster(newMonsters) {
    if (newMonsters.numberMonster === 1) {
      let dice = Math.floor(Math.random() * 20) + 1;
      let monster = { name: newMonsters.nameMonster, init: dice + newMonsters.init, hp: newMonsters.hp, maxhp: newMonsters.hp, monster: true }

      this.pjList.push(monster)
    } else {
      for (let i = 0; i < newMonsters.numberMonster; i++) {
        let name = newMonsters.nameMonster + " " + this.monsterNumber++;
        let dice = Math.floor(Math.random() * 20) + 1;
        let monster = { name: name, init: dice + newMonsters.init, hp: newMonsters.hp, maxhp: newMonsters.hp, monster: true }

        this.pjList.push(monster)
      }
    }
  }

}
