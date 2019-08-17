import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class PJService {

  constructor(public afStore: AngularFirestore) { }


  /**
   * Return players by story
   * @param storyID 
   * @param actualUserID 
   */
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

  /**
   * Update the information of a player
   * @param storyID 
   * @param actualUserID 
   * @param uidPJ 
   * @param data 
   */
  updatePJ(storyID, actualUserID, uidPJ, data){
    const pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`).doc(uidPJ);

    return new Promise((resolve,reject) =>{
      pj.update(data)
      .then(() =>resolve("Document successfully updated!")), (err =>reject(err))
    })
  }

  /**
   * Delete a player
   * @param storyID 
   * @param actualUserID 
   * @param uidPJ 
   */
  deletePJ(storyID, actualUserID, uidPJ){
    const pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`).doc(uidPJ);

    return new Promise((resolve,reject) =>{
      pj.delete()
      .then(() =>resolve("Document successfully delete it!"), err => reject(err))
    })
  }

  /**
   * Create a new player
   * @param storyID 
   * @param actualUserID 
   * @param data 
   */
  createPJ(storyID, actualUserID, data){
    let pj = this.afStore.collection(`users`).doc(actualUserID).collection(`stories`).doc(storyID).collection(`characters`);

    return new Promise((resolve,reject) =>{
      pj.add(data)
      .then(res => resolve(res), err => reject(err));
    })

  }
}
