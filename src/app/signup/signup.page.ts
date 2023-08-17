import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentials: FormGroup;

  constructor(	private fb: FormBuilder,
                private loadingController: LoadingController,
                private alertController: AlertController,
                private authService: AuthService,
                private router: Router) {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
  ngOnInit() {

  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const emailControl = this.credentials.get('email');
    const passwordControl = this.credentials.get('password');

    if (emailControl && passwordControl) {
      const email = emailControl.value;
      const password = passwordControl.value;

      const user = await this.authService.register(email, password);
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/home', {replaceUrl: true});
      } else {
        this.showAlert('Registration failed', 'Please try again!');
      }
    }
  }

  async showAlert(header : string , message : string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
