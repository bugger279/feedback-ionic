import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;

  constructor(private router: Router, private auth: AuthenticationService, private formBuilder: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    });

    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/feedback']);
    }
  }

  get f() { return this.registerForm.controls; }

  /**
   * registration
   */
  public registration() {
    localStorage.removeItem('token');
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log('Error');
      return;
    }

    this.auth.register(this.registerForm.get('name').value, this.registerForm.get('email').value).subscribe(
      (response) => {
        this.alertController.create({
          header: `Registered Successfully!`,
          message: `${response.message}`,
          buttons: [
            { text: 'Okay', role: 'cancel' },
            {
              text: 'Login',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      },
      (err) => {
        this.alertController.create({
          header: `Sorry`,
          message: `${err.error.message}! Please Choose another Email`,
          buttons: [
            { text: 'Cancel', role: 'cancel' },
          ]
        }).then(alertEl => {
          alertEl.present();
        });
      }
    );
  }
}
