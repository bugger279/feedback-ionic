import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  public submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]]
    });
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
    console.log('Success!');
    console.log(this.registerForm.get('name').value);
  }
}
