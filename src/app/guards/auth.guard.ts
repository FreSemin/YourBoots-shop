import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { EUserPermission } from '../components/models/authTokenData/authTokenData.model';
import { delay, map } from 'rxjs/operators';

const delayTimeOut: number = 2000;

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private _router: Router,
		private _authService: AuthService,
	) { }

	private _returnEmptyCompleteObs(): Observable<boolean> {
		return new Observable<boolean>((sub: Subscriber<boolean>) => {
			sub.next(null);
			sub.complete();
		});
	}

	public canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this._returnEmptyCompleteObs().pipe(
			delay(delayTimeOut), // wait for authAuth (bad solution)
			map(() => {
				const isAuthenticated: boolean = this._authService.getIsAuth();

				if (!isAuthenticated) {
					this.redirectToLogin();
					return false;
				}
				if (!this.checkPermission()) {
					this.redirectToHome();
					return false;
				}
				return true;
			}),
		);
	}

	public canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this._returnEmptyCompleteObs().pipe(
			delay(delayTimeOut), // wait for authAuth (bad solution)
			map(() => {
				const isAuthenticated: boolean = this._authService.getIsAuth();

				if (isAuthenticated) {
					this.redirectToAuth();

					return false;
				}
				return true;
			}),
		);
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
