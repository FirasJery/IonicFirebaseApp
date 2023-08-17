import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { where, query, QueryConstraint } from 'firebase/firestore';
import { Compteur } from "./compteur.model";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getCompteurByUserID(userID: string): Observable<Compteur[]> {
    const compteursRef = collection(this.firestore, 'compteurs');
    const userQuery: QueryConstraint = where('AssignedUserID', '==', userID);
    const filteredNotesQuery = query(compteursRef, userQuery);
    return collectionData(filteredNotesQuery, { idField: 'id' }) as Observable<Compteur[]>;
  }

  getCompteurById(id : string): Observable<Compteur> {
    const CompteurDocRef = doc(this.firestore, `compteurs/${id}`);
    return docData(CompteurDocRef, { idField: 'id' }) as Observable<Compteur>;
  }
  getCompteurs(): Observable<Compteur[]> {
    const csRef = collection(this.firestore, 'compteurs');
    return collectionData(csRef, { idField: 'id'}) as Observable<Compteur[]>;
  }

  addCompteur(c : Compteur ) {
    const CompteursRef = collection(this.firestore, 'compteurs');
    return addDoc(CompteursRef, c);
  }

  deleteCompteur(c: Compteur) {
    const compteurDocRef = doc(this.firestore, `compteurs/${c.id}`);
    return deleteDoc(compteurDocRef);
  }

  updateNote(c: Compteur) {
    const compteurDocRef = doc(this.firestore, `compteurs/${c.id}`);
    return updateDoc(compteurDocRef, { title: c.lat, text: c.long });
  }
}
