import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.storageService.getUser();
    if(user && user.roles && user.roles.includes('ROLE_USER')){
      return true;
    } else {
      this.router.navigate(['/home'])
        alert("You do not have access to this page!");
      return false;
    }
  }
  
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.storageService.getUser();

    if(user && user.roles && user.roles.includes('ROLE_ADMIN')){
      return true;
    } else {
      this.router.navigate(['/home'])
        alert("You do not have access to this page!");
      return false;
    }
    
  }
  
}
