import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class PJService {

  constructor(public afStore: AngularFirestore) { }


  getPJsByStory(storyID, actualUserID){
    let data:Array<any> = [];
    let pjs = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`);
    return new Promise((resolve,reject) => {
      pjs.get().subscribe(querySnapshot => {
        querySnapshot.forEach((doc) => {
          data.push({id: doc.id, character: doc.data()})
        })
        resolve(data)
      })
    })
  }

  updatePJ(storyID, actualUserID, uidPJ, data){
    let pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`).doc(uidPJ);

    return new Promise((resolve,reject) =>{
      pj.update(data).then(() =>{
        resolve("Document successfully updated!")
      }).catch(err =>{
        reject(err)
      })
    })
  }

  deletePJ(storyID, actualUserID, uidPJ){
    let pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`).doc(uidPJ);

    return new Promise((resolve,reject) =>{
      pj.delete().then(() =>{
        resolve("Document successfully updated!")
      })
    })
  }

  createPJ(storyID, actualUserID, data){
    let pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`);

    return new Promise((resolve,reject) =>{
      pj.add(data)
      .then(res => resolve(res), err => reject(err));
    })

  }
}
