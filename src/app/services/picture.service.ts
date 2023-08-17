import { Injectable } from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {collection, collectionData, Firestore , Timestamp} from "@angular/fire/firestore";
import { doc, docData, setDoc } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import {Observable} from "rxjs";
import { Picture } from "./picture.model";

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private auth: Auth, private firestore: Firestore, private storage: Storage) { }


  async uploadImage(cameraFile: Photo , counterId : string) {
    if (!cameraFile || !cameraFile.base64String) {
      console.error('Invalid cameraFile or base64String is undefined');
      return false;
    }

    const path = `uploads/${counterId}/counter.webp`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      const date = new Date();
      console.log(date);


      const counterDocRef = doc(this.firestore, `pictures/${counterId}`);
      await setDoc(counterDocRef, {
        imageUrl,
        date,
        counterId
      });

      return imageUrl;
    } catch (e) {
      console.error('Error uploading image:', e);
      return false;
    }

  }

  getAllPictures(): Observable<Picture[]> {
    const psRef = collection(this.firestore, 'pictures');
    return collectionData(psRef, { idField: 'id' }) as Observable<Picture[]>;
  }
}
