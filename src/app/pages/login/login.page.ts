import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { FireserviceService} from "../../fireservice.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;


  constructor(private Fs: FireserviceService,
              private  router:  Router,
              private alertController: AlertController,) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
      console.log(email, password);
        try {
          const userCredential = await this.Fs.login(email, password);
          console.log('User authenticated:', userCredential.user);
          this.showAlert('Login success', 'good !');
          this.router.navigateByUrl('/folder/inbox', {replaceUrl: true});
        } catch (error) {
          this.showAlert('Login failure', 'failure !');
        }
    }
  }
  async showAlert(header:string, message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  ngOnInit() {
  }
  goToSignUp() {
    this.router.navigate(['/signup']); // Replace 'signup' with the path to your sign-up page
  }

}
