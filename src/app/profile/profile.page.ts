import { Component, OnInit } from '@angular/core';
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email : string | null = "" ;

  constructor(private auth : Auth ) {

  }

  ngOnInit() {
    const uid = this.auth.currentUser ? this.auth.currentUser.uid : "";
    this.email = this.auth.currentUser ? this.auth.currentUser.email : "" ;
  }

}
