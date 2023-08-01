import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {title: 'Mes compteurs', url: '/folder/compteurs', icon: 'mail'},
    {title: 'Profile', url: '/folder/profile', icon: 'person-outline'},

  ];

  constructor(private fbauth: AngularFireAuth,
              private router:Router) {
  }


  logout() {
    // Call the logout method from your authentication service or wherever you handle the logout logic
    this.fbauth.signOut();
    this.router.navigate(['/login']);
  }
}
