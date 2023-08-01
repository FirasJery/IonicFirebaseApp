// compteurs.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compteur } from './compteur';

import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CompteursService {
  constructor(private firestore: Firestore) {}

  // Create a new compteur document in Firestore
  addCompteur(compteur: Compteur) {
    const compRef = collection(this.firestore, 'compteurs');
    return addDoc(compRef, compteur);
  }

}
