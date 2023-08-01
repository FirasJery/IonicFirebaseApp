import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(private afAuth: AngularFireAuth ) { }

  async login(email: string, password: string){

      const uc = await this.afAuth.signInWithEmailAndPassword(email, password);
      // Authentication successful, return the user credential
      return uc;

  }

  logout() {
    this.afAuth.signOut()
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

}
