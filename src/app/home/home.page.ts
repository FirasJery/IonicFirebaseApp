import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { AuthService } from "../services/auth.service";
import { Compteur } from "../services/compteur.model";
import { ModalPage } from '../modal/modal.page';
import { Auth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { ActionSheetController } from '@ionic/angular';
import { Picture } from "../services/picture.model";
import {PictureService} from "../services/picture.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  compteurs: Compteur[] = [];
  pictures : Picture[] = [];
  filteredCompteurs: Compteur[] = [];
  selectedFilter: string = "all";


  constructor( private actionSheetController: ActionSheetController ,
               private  router:  Router,
               private as : AuthService ,
               private dataService: DataService,
               private cd: ChangeDetectorRef,
               private alertCtrl: AlertController,
               private modalCtrl: ModalController ,
               private auth : Auth ,
               private Picservice : PictureService) {}


  ngOnInit() {
   this.loadData();
  }
  loadData() {
    const uid = this.auth.currentUser ? this.auth.currentUser.uid : "";

    this.dataService.getCompteurByUserID(uid).subscribe(res => {
      this.compteurs = res;
      this.filterCompteurs();
    });

    this.Picservice.getAllPictures().subscribe(res => {
      this.pictures = res;
    });
    this.pictures.forEach(e => console.log(e.date));
  }

  filterCompteurs() {
    if (this.selectedFilter === 'all') {
      this.filteredCompteurs = this.compteurs;

    } else if (this.selectedFilter === 'done') {
      this.filteredCompteurs = this.compteurs.filter(compteur => this.hasImage(compteur));

    } else if (this.selectedFilter === 'undone') {
      this.filteredCompteurs = this.compteurs.filter(compteur => !this.hasImage(compteur));

    }
  }

  hasImage(c : Compteur) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const pic = this.pictures.find(image =>
      image.counterId === c.id  &&
      image.date.toDate().getMonth() + 1 === currentMonth &&
      image.date.toDate().getFullYear() === currentYear

    );
    return !!pic;

  }

   getImageUrl(c : Compteur) {
     const pic = this.pictures.find(image =>
       image.counterId === c.id

     );
     return pic ? pic.imageUrl : '';
  }

  async addNote() {
    const uid = this.auth.currentUser ? this.auth.currentUser.uid : "";
    const alert = await this.alertCtrl.create({
      header: 'Ajouter compteur',
      inputs: [
        {
          name: 'long',
          placeholder: 'longitude',
          type: 'text'
        },
        {
          name: 'lat',
          placeholder: 'latitude',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addCompteur({Owner: "", AssignedUserID: uid , long: res.long, lat: res.lat });
          }
        }
      ]
    });

    await alert.present();
  }

  async openNote(c: Compteur) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: c.id ,
        owner : c.Owner,
      long : c.long ,
      lat : c.lat ,
      hasImage : this.hasImage(c)},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  public actionSheetButtons = [
    {
      text: 'Profile',
      handler: () => {
        this.handleAction('GoProfile');
      },
      icon: 'person',
    },
    {
      text: 'Logout',

      handler: () => {
        this.handleAction('logout');
      },
      icon : 'log-out',
    },

  ];

  handleAction(action: string) {
    switch (action) {
      case 'GoProfile':
        this.router.navigateByUrl('/profile');
        break;
      case 'logout':

      {
        this.auth.signOut().then(() => this.router.navigate(['']));
      }

        break;

    }
  }
}

