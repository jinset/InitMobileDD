import { Injectable } from '@angular/core';

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore"
import { User, auth } from 'firebase';

import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  usersCollection: AngularFirestoreCollection<any>;
  collection: any;
  constructor(public afAuth: AngularFireAuth, public afStore: AngularFirestore, public router: Router) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // })


  }


  login(email: string, password: string) {
    return new Promise((resolve) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userInfo => {
          resolve([true, this.afAuth.auth.currentUser])
        })
        .catch(err => {
          resolve([false, err.message]);
        })
    })
  }

  addNewAccount(email: string, nickName: string, uid: number) {
    return new Promise((resolve) => {
      this.afStore.collection("users").add({
        nickName: nickName,
        email: email,
        UID: uid,
        stories: []
      }).then(() => {
        resolve(true)
      })
        .catch(err => {
          resolve([false, err.message])
        })
    })
  }

  register(email: string, password: string, nickName: string) {
    return new Promise((resolve) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(result => {
        resolve(this.addNewAccount(email, nickName, Number(result.user.uid)))
      })
        .catch(err => {
          resolve([false, err.message])
        })
    })
    // this.sendEmailVerification();
  }


  returnUsers() {
    this.usersCollection = this.afStore.collection<any>('users');

    return this.collection = this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => ({
        ...a.payload.doc.data(), id: a.payload.doc.id
      })))
    );
  }



  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification()
    this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['admin/login']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
}
