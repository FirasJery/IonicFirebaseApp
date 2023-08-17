import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {PictureService} from "../services/picture.service";
import {AlertController, LoadingController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.page.html',
  styleUrls: ['./pictures.page.scss'],
})
export class PicturesPage implements OnInit {
  counterId : string = "";
  takenImage: string | boolean = false;

  constructor(private route: ActivatedRoute,
              private ps: PictureService,
              private authService: AuthService,
              private router: Router,
              private loadingController: LoadingController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.counterId = params['id'];
    });
  }


  async UploadImage() {
    const image: Photo =  await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera });// Camera, Photos, or Prompt!

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.ps.uploadImage(image, this.counterId);
      loading.dismiss();

      if (result) {
        this.takenImage = result; // Set the image URL

      } else {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your image.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }


}
