import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }
  title = 'ordering-system';

  async onLogOut() {
    await this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
