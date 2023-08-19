import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IUser } from './User';
import { ErrorService } from '../core/error/error.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private http: HttpClient,
    private errorService: ErrorService
  ) {
    this.setUser();
  }

  login(email: string, password: string) {
    
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        this.errorService.setError(error);
      });

 
  }

  register(firstName, lastName, email, phone, password) {

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.storeUserData(result.user, firstName, lastName, phone);
        return result.user.updateProfile({ displayName: firstName.concat(" ", lastName) })

      }).then(() => { this.setUser() })
      .catch((error) => {
        this.errorService.setError(error);
      });

  }


  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user !== null ? true : false;
  }


  setUserData(user: any) {
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


  signOut() {

    this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['home']);
    })
    .catch((error) => {
      this.errorService.setError(error);
    });

  }

  storeUserData(user: IUser, firstName, lastName, phone, ...args) {
    this.http.put<IUser>(
      `databaseURL/users/${user.uid}.json`,
      { id: user.uid, email: user.email, firstName, lastName, phone, trucks: [...args] }).subscribe();
  }

  getUserProfile() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return this.http.get(
      `databaseURL/users/${user.uid}/.json`)

  }

  editUserProfile(firstName, lastName, phone, truck1, truck2, truck3, truck4) {

    this.afAuth.user
      .subscribe({
        next: (user) => {
        this.setUserData(user);
        this.storeUserData(user, firstName, lastName, phone, truck1, truck2, truck3, truck4);
        user.updateProfile({ displayName: firstName.concat(" ", lastName) })
        .then(() => { this.setUser() })
        },
        error: (err) => this.errorService.setError(err)
        
      })


  }

  setUser() {

    this.afAuth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.userData = user;
          sessionStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(sessionStorage.getItem('user')!);
        } else {
          sessionStorage.setItem('user', 'null');
          JSON.parse(sessionStorage.getItem('user')!);
        }
      },
      error(error){
        this.errorService.setError(error);
      }
    });

  }


}

