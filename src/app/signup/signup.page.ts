import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async onSubmit() {
    try {
      // Register the user with Firebase Auth
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.user.email, this.user.password);
      if (userCredential?.user) {
        await userCredential.user.updateProfile({
          displayName: `${this.user.firstName} ${this.user.lastName}`,

        });
      }



    } catch (error) {
      // Handle any errors that occur during registration
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again.");
    }
  }



}
