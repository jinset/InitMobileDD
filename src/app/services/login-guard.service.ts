import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AuthService } from '../services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
  constructor(public navCtrl: NavController, private authService: AuthService, public toastService: ToastService, public storage: Storage)
  {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
      this.authService.isLoggedIn().then(async (data: any) => {
        if (data) {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              email: data.email
            }
          };
          this.navCtrl.navigateForward(['home'], navigationExtras);
          return true;
        } else {
          this.navCtrl.navigateForward('login');
          return false;
        }
      });
      return false;
  }
}




