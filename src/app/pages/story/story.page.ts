import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from "@angular/router";
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  story: any;

  constructor(private storage:Storage, private route: ActivatedRoute, public navCtrl: NavController) {

    this.route.queryParams.subscribe(params => {
      this.story = params;
      this.storage.set('storyID', this.story.id);
    });
  }

  ngOnInit() {

  }

  goToPj() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.story.id
      }
    };
    this.navCtrl.navigateForward(['character'], navigationExtras);
  }

  goToInit() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: this.story.id
      }
    };
    this.navCtrl.navigateForward(['init'], navigationExtras);
  }

}
