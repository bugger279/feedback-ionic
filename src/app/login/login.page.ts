import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { debuglog } from 'util';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  constructor(private router: Router, private auth: AuthenticationService, private formBuilder: FormBuilder, private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/feedback']);
    }
  }

  get f() { return this.loginForm.controls; }

  /**
   * login
   */
  public login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('token', JSON.stringify(response.data.token));
        this.toastController.create({
          message: `${response.message}! You will be redirected to Feedback Page.`,
          duration: 3000
        }).then(toastEl => {
          toastEl.present();
        });
        setTimeout(() => {
          this.router.navigate(['/feedback']);
        }, 2000);
      },
      (err) => {
        this.toastController.create({
          message: `Login Failed ${err.error.data}`,
          duration: 3000
        }).then(toastEl => {
          toastEl.present();
        });
      }
    );
  }

}
