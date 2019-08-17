import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(public afStore: AngularFirestore) { }

  getAllStoriesByUserID(userID){
    const data:Array<any> = [];
    const stories = this.afStore.collection(`users`).doc(userID).collection(`stories`);

    return new Promise(resolve => {
      stories.get().subscribe(querySnapshot => {
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, story: doc.data()})
        })
        resolve(data)
      })
    })
  }

  createStory(actualUserID, data){
    const story = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`);

    return new Promise((resolve,reject) =>{
      story.add(data)
      .then(res => resolve(res), err => reject(err));
    })
  };

  deleteStory(actualUserID, uidStory){
    const story = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(uidStory);

    return new Promise((resolve,reject) =>{
      story.delete()
      .then(() =>{
        resolve("Document successfully delete it!"), err => (reject(err));
      })
    })
  };


  updateStory(storyID, actualUserID, data){
    const pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID);

    return new Promise((resolve,reject) =>{
      pj.update(data)
      .then(() =>resolve("Document successfully updated!")), (err =>reject(err))
    })
  }


}
