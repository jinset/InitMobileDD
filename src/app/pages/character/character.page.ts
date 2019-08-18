import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EditPjComponent } from "../../modals/edit-pj/edit-pj.component";
import { NavController, ModalController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PJService } from '../../services/PJ/pj.service';
import { LoadingService } from '../../services/loading/loading.service';
import { ToastService } from '../../services/toast/toast.service';

import { AlertService } from '../../services/alert/alert.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {
  pjsList: any = [];
  loading: any;

  constructor(
    private route: ActivatedRoute, 
    public navCtrl: NavController, 
    private storage: Storage, 
    private pJService: PJService, 
    public modalController: ModalController, 
    public alertService:AlertService,
    public loadingService: LoadingService) {
  }

  async ngOnInit() {
    await this.loadPjs()

  }

  async loadPjs() {
    this.loading = this.loadingService.showLoading();
    this.route.queryParams.subscribe(params => {
      this.storage.get('userUID').then((val) => {
        this.getPjs(params.id, val).then(listPj => {
          this.pjsList = listPj;
          this.loading = this.loadingService.hideLoading();
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


  async delete(pj) {
    await this.alertService.showAlert("Are you sure?",`Do you want to delete <strong>${pj.character.name}</strong>?, This process cannot be undone`).then(data =>{
      if(data){
        this.deleteFun(pj.id).then(()=>{
          this.loadPjs();
        })
      }
    })
  }

  async deleteFun(uidPJ){
    const userID = await this.storage.get('userUID');
    const storyID = await this.storage.get('storyID')
    await this.pJService.deletePJ(storyID,userID,uidPJ)
  }


}
