import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggingIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => console.log(user))
  }

  async onLogin() {
    this.toggleIsLogginIn();
    const { username, password } = this.loginForm.value;

    try {
      await this.authService.login(username, password);
      this.router.navigateByUrl('');
    } catch (error) {
      console.error(error);
    }

    this.toggleIsLogginIn();
  }
  
  toggleIsLogginIn() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
