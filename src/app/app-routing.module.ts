import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
// import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { UserGuard } from './guards/user.guard';

// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToDashboard = () => redirectLoggedInTo(['']);
// const redirectLoggedInToAdminDashboard = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    // ...canActivate(redirectUnauthorizedToLogin)
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'login', component: LoginComponent,
    // ...canActivate(redirectLoggedInToDashboard)
    canActivate: [AutoLoginGuard]
  },
  {
    path: 'admin', component: AdminComponent,
    // ...canActivate(redirectLoggedInToAdminDashboard)
    canActivate: [AuthGuard, UserGuard]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
