import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PJService } from 'src/app/services/PJ/pj.service';
@Component({
  selector: 'app-init',
  templateUrl: './init.page.html',
  styleUrls: ['./init.page.scss'],
})
export class InitPage implements OnInit {
  pjsList:any = [];

  constructor(private route: ActivatedRoute, public loadingController: LoadingController,public navCtrl: NavController,private storage: Storage,private pJService: PJService) {
    this.route.queryParams.subscribe(params => {
      this.storage.get('userUID').then((val) => {
        this.getPjs(params.id, val);
      });
    });
   }

  ngOnInit() {

  }

  async getPjs(idStory, idUser){
    this.pjsList = await this.pJService.getPJsByStory(idStory, idUser);
    console.log(this.pjsList);
  }

}
