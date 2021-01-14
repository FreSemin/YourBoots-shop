import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { EUserPermission } from '../components/models/authTokenData/authTokenData.model';

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
		if (!this._authService.getIsAuth()) {
			this.redirectToLogin();
			return false;
		}
		if (!this.checkPermission()) {
			this.redirectToHome();
			return false;
		}
		return true;
	}

	public checkPermission(): boolean {
		const permission: string = this._authService.getUserPermission();

		return permission === EUserPermission.admin || permission === EUserPermission.moderator;
	}

	public redirectToHome(): void {
		this._router.navigate(['/']);
	}

	public redirectToAdmin(): void {
		this._router.navigate(['admin']);
	}

	public redirectToLogin(): void {
		this._router.navigate(['login']);
	}

	public redirectBack(): void {
		if (this._authService.getIsAuth()) {
			this._location.back();
		}
	}

}
