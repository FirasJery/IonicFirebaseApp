import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireserviceService} from "../fireservice.service";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {




  public folder!: string;
  public uid !: string ;
  public email !:string | null ;


  private activatedRoute = inject(ActivatedRoute);



  constructor(private Afa: AngularFireAuth, private fs : FireserviceService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.Afa.authState.subscribe((user: User | null) => {
      if (user) {
        // You can access user properties like user.uid, user.email, etc.
       this.uid =  user.uid;
       this.email = user.email;
        // ... Access other user properties here ...
      } else {
        // No user is signed in.
        console.log('No user signed in.');
      }



    });
  }
}
