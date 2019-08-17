import { Component, OnInit } from '@angular/core';
import { NavParams,ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../services/loading/loading.service';
import { StoryService } from 'src/app/services/story/story.service';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent  {
  itsNew:boolean;
  loading:any;
  name:string;
  description:string;
  uid:string;
  date:Date = new Date();

  constructor(public storage:Storage,public navParams: NavParams,public modalController: ModalController,public loadingService: LoadingService, public storyService:StoryService) { }

  ionViewWillEnter() {
    const story= this.navParams.get('story');
    if(story){
      this.itsNew = false
      this.name = story.story.name;
      this.description = story.story.description;
      this.date = story.story.date;
      this.uid = story.id;
    }else{
      this.itsNew = true;
    }
  }

  async dismiss(action) {
    await this.modalController.dismiss(action)
  }

  async created(){
    this.loading = this.loadingService.showLoading();
    const userID = await this.storage.get('userUID');
    
    const dataStory = {
      dateCreation: this.date,
      description: this.description,
      name: this.name
    }

    if(this.itsNew){
      this.storyService.createStory(userID, dataStory);
    }else{
      this.storyService.updateStory(this.uid, userID, dataStory);
    }

    this.loading = this.loadingService.hideLoading();
    this.dismiss(true)
  }

}
