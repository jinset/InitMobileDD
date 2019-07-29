import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { NavController, LoadingController } from '@ionic/angular';

import { UserService } from '../../services/user/user.service';
import { StoryService } from '../../services/story/story.service'
import { PJService } from '../../services/PJ/pj.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
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
  email: string;
  actualUser: any;
  storiesList: any;

  constructor(private storage: Storage,private route: ActivatedRoute, private userService: UserService, private storyService: StoryService,private pJService: PJService, public loadingController: LoadingController,public navCtrl: NavController) {

    this.route.queryParams.subscribe(params => {
      this.email = params.email;
    });

  }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });

    await loading.present();

    this.getUserByEmail(this.email).then(() => {
      this.getStoriesByUserID(this.actualUser.id).then(()=>{
        loading.dismiss();
      });
    })
  }

  async getStoriesByUserID(userID) {
    this.storiesList= await this.storyService.getAllStoriesByUserID(userID)
  }


  async getUserByEmail(email) {
    this.actualUser = await this.userService.getUserByEmail(email);
    this.storage.set('userUID', this.actualUser.id);

  }


  async goToStory(story){
    // let data = await this.pJService.getPJsByStory(story, this.actualUser.id);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: story.id,
        name: story.story.name
      }
    };
    this.navCtrl.navigateForward(['story'], navigationExtras);
  }
}
