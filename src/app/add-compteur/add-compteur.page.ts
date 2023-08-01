
import { Component } from '@angular/core';
import { Compteur } from '../compteur'
import { CompteursService } from '../service-compteur.service';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-add-compteur',
  templateUrl: './add-compteur.page.html',
  styleUrls: ['./add-compteur.page.scss']
})
export class AddCompteurPage {

  compteur: Compteur = { long: '', lat: '', userID: '' };
  public uid !: string ;


  constructor(private compteursService: CompteursService , private Afa: AngularFireAuth) {}

  onSubmit() {
    // Set the current user ID directly
    this.Afa.authState.subscribe((user: User | null) => {
      if (user) {
        // You can access user properties like user.uid, user.email, etc.
        this.uid = user.uid;

        // ... Access other user properties here ...
      } else {
        // No user is signed in.
        console.log('No user signed in.');
      }
    });
    this.compteur.userID = this.uid ;

    this.compteursService.addCompteur(this.compteur)
      .then((docRef) => {
        console.log('Compteur added with ID:', docRef.id);
        // Optionally, reset the form after adding the compteur
        this.compteur = { long: '', lat: '', userID: '' };
      })
      .catch((error) => {
        console.error('Error adding compteur:', error);
      });
  }
}
