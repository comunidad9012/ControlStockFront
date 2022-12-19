import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchingOpenGuard implements CanActivate {

  constructor(public navController: NavController) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('arching-open') === 'true') {
        return true;
      } else if (localStorage.getItem('arching-open') === 'false') {
        this.navController.navigateRoot('tablinks/arching');
        return false;
      }
  }
}
