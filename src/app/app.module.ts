import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { OrderFormComponent } from './components/dialogs/order-form/order-form.component';
import { ConfirmationComponent } from './components/dialogs/confirmation/confirmation.component';
import { TableComponent } from './components/table/table.component';


import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    PageNotFoundComponent,
    OrderFormComponent,
    ConfirmationComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    {
    provide: FIREBASE_OPTIONS, useValue: environment.firebase,
    }, 
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
