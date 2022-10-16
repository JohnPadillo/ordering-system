import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { AuthUser } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<AuthUser | null | undefined>;
  user = new BehaviorSubject<AuthUser | null | undefined>(undefined);

  constructor(
    private auth: Auth,
    private afs: AngularFireAuth
  ) {
    this.user$ = this.user.asObservable()
      .pipe(
        filter(user => user !== undefined)
      );

    this.auth.onAuthStateChanged((user: any) => {
      if (user?.email === 'admin@gmail.com') {
        user.isAdmin = true;
      }
      this.user.next(user);
    });
  }

  async login(username: string, password: string) {
    let email = '';

    if (username == 'user' && password == 'user') {
      email = 'user@gmail.com';
      password = 'user123';
    } else if (username == 'admin' && password == 'admin') {
      email = 'admin@gmail.com';
      password = 'admin123'
    }

    const user: any = await signInWithEmailAndPassword(this.auth, email, password);

    if (username == 'admin') {
      user.isAdmin = true;
    }
    return user;
  }

  async logout() {
    await signOut(this.auth);
    this.user.next(null);
  }
}
