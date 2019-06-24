import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-create-monster-modal',
  templateUrl: './create-monster-modal.component.html',
  styleUrls: ['./create-monster-modal.component.css']
})
export class CreateMonsterModalComponent implements OnInit {
  initMonster: number;
  numberMonster: number;
  nameMonster: string;
  healPointsMonster: number;

  constructor(public dialogRef: MatDialogRef<CreateMonsterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openGeneratedMonsterModal(initMonster,numberMonster,healPointsMonster,nameMonster){
    this.dialogRef.close({
      init:initMonster,
      numberMonster:numberMonster, 
      hp: healPointsMonster, 
      nameMonster: nameMonster
    });
    this.initMonster = null;
    this.numberMonster = null;
    this.healPointsMonster = null;
    this.nameMonster = null;

  }

}
