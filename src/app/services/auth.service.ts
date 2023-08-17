import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { Firestore, collection,  collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth, private firestore : Firestore ) {}

  async register( email : string , password : string ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user && user.email && user.uid) {
        // Create a new User object and fill it with data from user.user
        const u: User = {
          id: user.uid,
          firstName: '', // Add first name data if available
          lastName: '', // Add last name data if available
          email: user.email,
        };

        // Add the new user data to the "users" collection in Firestore
        const userDocRef = collection(this.firestore, 'users');
        await addDoc(userDocRef, u);

        return user;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async login( email : string , password : string ) {
    try {
      const userCreds = await signInWithEmailAndPassword(this.auth, email, password);
      return userCreds;
    } catch (error) {
      const authError = error as { code: string };
      if (authError.code === 'auth/user-not-found') {
        throw new Error('User not found. Please check your email or register.');
      } else if (authError.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else {
        throw new Error('An error occurred during login. Please try again later.');
      }
    }
  }


}
