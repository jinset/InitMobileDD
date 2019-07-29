import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(public afStore: AngularFirestore) { }

  getAllStoriesByUserID(userID){
    let data:Array<any> = [];
    let stories = this.afStore.collection(`users`).doc(userID).collection(`stories`);

    return new Promise(resolve => {
      stories.get().subscribe(querySnapshot => {
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, story: doc.data()})
        })
        resolve(data)
      })
    })

  }
}
