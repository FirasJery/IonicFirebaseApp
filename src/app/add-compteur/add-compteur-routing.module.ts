import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCompteurPage } from './add-compteur.page';

const routes: Routes = [
  {
    path: '',
    component: AddCompteurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCompteurPageRoutingModule {}
