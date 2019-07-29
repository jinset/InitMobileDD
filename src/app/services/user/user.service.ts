import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afStore: AngularFirestore) { }


  getUserByEmail(email) {
    let user = this.afStore.collection('users', ref => ref.where('email', '==', email));

    return new Promise(resolve => {
      user.get().subscribe(querySnapshot => {
        querySnapshot.forEach((doc) => {
          resolve({id :doc.id, user: doc.data()})
        })
      })

    })

  }

}




