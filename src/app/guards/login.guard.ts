import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor(
		private _router: Router,
		private _location: Location,
		private _authService: AuthService,
	) { }

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.checkPermission()) {
			return true;
		} else {
			this.redirectToLogin();
			return false;
		}
	}

	public checkPermission(): boolean {
		return this._authService.getAuthStatus();
	}

	public redirectToAdmin(): void {
		this._router.navigate(['admin']);
	}

	public redirectToLogin(): void {
		this._router.navigate(['login']);
	}

	public redirectBack(): void {
		if (this.checkPermission()) {
			this._location.back();
		}
	}

}
