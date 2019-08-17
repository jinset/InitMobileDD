import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { NavController, ModalController } from '@ionic/angular';

import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

import { StoryService } from '../../services/story/story.service'
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { StoryComponent } from "../../modals/story/story.component";
import { AlertService } from '../../services/alert/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  email: string;
  storiesList: any;
  loading: any;
  checkLength:boolean;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  };

  constructor(
    private storage: Storage,
    private route: ActivatedRoute, 
    private userService: UserService, 
    private authService: AuthService,
    private storyService: StoryService,
    public loadingService: LoadingService,
    public navCtrl: NavController, 
    public toastService: ToastService,
    public modalController: ModalController,
    public alertService:AlertService) {
    this.route.queryParams.subscribe(params => {
      this.email = params.email;
    });
  }

  async ngOnInit() {

    this.loading = this.loadingService.showLoading();

    await this.userService.getUserByEmail(this.email).then(async (actualUser:any) => {
      this.storage.set('userUID', actualUser.id);
      this.storiesList = await this.storyService.getAllStoriesByUserID(actualUser.id);
      if(this.storiesList.length){
        this.checkLength = true;
      }
      this.loading = this.loadingService.hideLoading();
    }).catch(err =>{
      this.loading = this.loadingService.hideLoading();
      this.toastService.presentToast(err)
    })
  }

  async goToStory(story){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: story.id,
        name: story.story.name
      }
    };
    this.navCtrl.navigateForward(['story'], navigationExtras);
  }

  async openModel(story) {
    const modal = await this.modalController.create({
      component: StoryComponent,
      componentProps: { story: story}
    });

    modal.onDidDismiss().then(async data => {
      if(data.data){
        this.loading = this.loadingService.showLoading();
        const userID = await this.storage.get('userUID');
        this.storiesList = await this.storyService.getAllStoriesByUserID(userID);
        this.loading = this.loadingService.hideLoading();
      }
    })
    await modal.present();
  }


  async logOut() {
    await this.alertService.showAlert("Logout?",`Do you want to logout?`).then(data =>{
      if(data){
        this.authService.logout();
      }
    })
  }

}
