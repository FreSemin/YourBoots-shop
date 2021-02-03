import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { EUserPermission } from '../components/models/authTokenData/authTokenData.model';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private _router: Router,
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

	public canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		if (this._authService.getIsAuth()) {
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

	public redirectToAuth(): void {
		this._router.navigate(['auth']);
	}

	public redirectToLogin(): void {
		this._router.navigate(['auth', 'login']);
	}

}
