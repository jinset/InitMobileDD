import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  acceptDelete(){
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}

