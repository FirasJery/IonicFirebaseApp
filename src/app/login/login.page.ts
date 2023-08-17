import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;


  constructor(private As: AuthService,
              private  router:  Router,
              private alertController: AlertController,) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.min(6)])
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      try {
        const userCredential = await this.As.login(email, password);

        this.router.navigateByUrl('/home', {replaceUrl: true});
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
    this.router.navigate(['/signup']);
  }

}
