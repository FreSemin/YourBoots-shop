import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor(
		private _router: Router,
		private _location: Location,
	) { }

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// if (this.checkPermission()) {
		return true;
		// } else {
		// this.redirectToLogin();
		// return false;
		// }
	}

	public checkPermission(): boolean {
		const permissionVal: number = Number(localStorage.getItem('permission'));

		return Boolean(permissionVal) ? true : false;
	}

	public redirectToLogin(): void {
		this._router.navigate(['login']);
	}

	public redirectBack(): void {
		// if (this.checkPermission()) {
		// this._location.back();
		// }
	}

}
