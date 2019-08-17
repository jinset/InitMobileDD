import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore"
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public afAuth: AngularFireAuth, 
    public afStore: AngularFirestore, 
    public router: Router, 
    private storage: Storage) {
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userInfo => {
          if (userInfo.user.emailVerified) {
            resolve(this.afAuth.auth.currentUser)
          } else {
            reject(`Please, verified your e-mail <b>${email}</b>`);
          }
        })
        .catch(err => {
          reject(err.message);
        })
    })
  }

  async addNewAccount(email: string, nickName: string) {
    return new Promise((resolve,reject) => {
      this.afStore.collection("users").add({
        nickName: nickName,
        email: email,
        date: new Date()
      }).catch(err => {
        reject(err.message)
      })
    })
  }

   register(email: string, password: string, nickName: string) {
    return new Promise(async (resolve,reject) => {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(()=>{
      })
      .then( async ()=>{
        await this.addNewAccount(email, nickName)
      })
      .then(()=>{
        resolve(this.afAuth.auth.currentUser.sendEmailVerification());
      }).catch(err => {
        reject(err.message)
      })
    })
  }


  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    await this.storage.remove('userUID');
    await this.storage.remove('rememberUser')

    this.router.navigate(['login']);
  }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return user !== null;
  // }

  async loginWithGoogle() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
}
