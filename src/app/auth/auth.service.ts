import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser } from './User';
import { environment } from "../../environments/environment"

const databaseURL = environment.firebase.databaseURL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private http: HttpClient
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(sessionStorage.getItem('user')!);
      } else {
        sessionStorage.setItem('user', 'null');
        JSON.parse(sessionStorage.getItem('user')!);
      }
    });
  }

  // Login with email/password
  Login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  Register({email, password, firstName, lastName, phone}: 
    {email: string, password: string, firstName: string, lastName: string, phone: string}) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.storeUserData(result.user, firstName, lastName, phone);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user !== null ? true : false;
  }
  /* Setting up user data when login */
  SetUserData(user: any, _firstName?: string, _lastName?: string, _phone?: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: IUser = {
      uid: user.uid,
      email: user.email,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['home']);
    });
  }

  storeUserData(user: IUser, firstName, lastName, phone) {
    this.http.put<IUser>(
    `${databaseURL}/users/${user.uid}.json`,
    { id: user.uid, email: user.email, firstName, lastName, phone }).subscribe();
  }
}

