import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  user:firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    public authService:AuthService,
    public router: Router){
      this.afAuth.authState.subscribe(user => this.user = user);
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.afAuth.authState
      .filter( authState => {
        if (!authState || authState == null) {
          this.router.navigate(['/login']);
          return false
        }
        return true;
      })
      .map(authState => authState.providerData[0].providerId)
      .map(provider => {
        switch (provider) {
          case "password":
            return true;
          default:
            this.router.navigate(['/login']);
            return false;
        }
      })
  }

  canActivateChild (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // if (this.user && this.user.providerData[0].providerId == "password") {
      //     this.router.navigate(['/login']);
      //     return false
      //   }
      // return true;

      return this.afAuth.authState
      .take(1)
      .map(user => {
        if (this.user && this.user != null && this.user.providerData[0].providerId == "password") {
          return true
        } else {
          this.router.navigate(['/login']);
          return false;
        };
      })
      
  }

}
