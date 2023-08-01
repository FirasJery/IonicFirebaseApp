import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCompteurPageRoutingModule } from './add-compteur-routing.module';

import { AddCompteurPage } from './add-compteur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCompteurPageRoutingModule
  ],
  declarations: [AddCompteurPage]
})
export class AddCompteurPageModule {}
