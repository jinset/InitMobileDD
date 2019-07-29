import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EditPjComponent } from "../../modals/edit-pj/edit-pj.component";
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PJService } from 'src/app/services/PJ/pj.service';


@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  pjsList: any = [];
  loading: any;
  constructor(private route: ActivatedRoute, public loadingController: LoadingController, public navCtrl: NavController, private storage: Storage, private pJService: PJService, public modalController: ModalController) {

  }

  async ngOnInit() {
    this.loadPjs()

  }

  async loadPjs() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    this.route.queryParams.subscribe(params => {
      this.storage.get('userUID').then((val) => {
        this.getPjs(params.id, val).then(listPj => {
          this.pjsList = listPj;
          loading.dismiss();
        });
      });
    });

  }


  async openEdit(pj) {

    const modal = await this.modalController.create({
      component: EditPjComponent,
      componentProps: { pj: pj}
    });

    modal.onDidDismiss().then(data => {
      if(data.data){
        this.loadPjs();
      }
    })
    await modal.present();

  }



  async getPjs(idStory, idUser) {
    return await this.pJService.getPJsByStory(idStory, idUser);
  }

}
