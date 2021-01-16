import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';
import { AuthTokenData, EUserPermission, IAuthTokenData, IAuthTokenServerData } from 'src/app/components/models/authTokenData/authTokenData.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _token: string = '';
	private _isAuthenticated: boolean = false;
	private _tokenTimer: any;
	private _toMilSec: number = 1000;
	private _userPermission: string = '';

	public userEmail: string = '';

	// tslint:disable-next-line: no-empty
	constructor(
		private _http: HttpClient,
		private _router: Router,
	) { }

	private saveAuthDataLS(data: IAuthTokenData): void {
		localStorage.setItem('token', data.token);
		localStorage.setItem('expiration', data.expirationDate.toISOString());
		localStorage.setItem('userEmail', data.userEmail);
	}

	private clearAuthDataLS(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('userEmail');
	}

	private getAuthDataLS(): any {
		const tokenLS: string = localStorage.getItem('token');
		const expirationDateLS: string = localStorage.getItem('expiration');
		const userEmailLS: string = localStorage.getItem('userEmail');

		// tslint:disable-next-line: strict-boolean-expressions
		if (!tokenLS || !expirationDateLS) {
			return;
		}
		return new AuthTokenData({
			token: tokenLS,
			expirationDate: new Date(expirationDateLS),
			userEmail: userEmailLS,
		});
	}

	private setAuthTimer(duration: number): void {
		this._tokenTimer = setTimeout(() => {
			this.onUserLogout();
		}, duration * this._toMilSec);
	}

	public autoAuthUser(): void {
		const authData: IAuthTokenData = this.getAuthDataLS();

		if (!authData) {
			return;
		}

		const now: Date = new Date();
		const expiresIn: number = authData.expirationDate.getTime() - now.getTime();

		if (expiresIn > 0) {
			this._token = authData.token;
			this.userEmail = authData.userEmail;
			this.setAuthTimer(expiresIn / this._toMilSec);
			this.getUserPermissionSR();
			this._isAuthenticated = true;
		}
	}

	public getToken(): string {
		return this._token;
	}

	public getIsAuth(): boolean {
		return this._isAuthenticated;
	}

	public getUserPermission(): string {
		return this._userPermission;
	}

	public getUserPermissionSR(): void {
		this._http.get<{ permission: string }>(
			'http://localhost:3000/api/auth/permission/' + this.userEmail,
		)
			.subscribe((response: { permission: string }) => {
				this._userPermission = response.permission;
			});
	}

	public onUserSingup(form: NgForm): void {
		if (form.invalid) {
			return;
		}

		const userAuthData: IAuthData = {
			email: form.value.userEmail,
			password: form.value.userPassword,
		};

		this._http.post(
			'http://localhost:3000/api/auth/user/signup',
			userAuthData
		)
			.subscribe((response: any) => {
				form.reset();
			});
	}

	public onUserLogin(form: NgForm): void {
		if (form.invalid) {
			return;
		}

		const userAuthData: IAuthData = {
			email: form.value.loginEmail,
			password: form.value.loginPassword,
		};

		this._http.post<IAuthTokenServerData>(
			'http://localhost:3000/api/auth/user/login',
			userAuthData
		).subscribe((response: IAuthTokenServerData) => {
			const token: string = response.token;
			const expiresInDuration: number = response.expiresIn;

			this._userPermission = response.userPermission;

			this.userEmail = form.value.loginEmail;

			this._token = token;

			if (token !== '') {
				this.setAuthTimer(expiresInDuration);

				this._isAuthenticated = true;

				const now: Date = new Date();
				const expirationDate: Date = new Date(now.getTime() + expiresInDuration * this._toMilSec);
				this.saveAuthDataLS(new AuthTokenData({
					token,
					expirationDate,
					userEmail: this.userEmail
				}));

				form.reset();
				this.redirectToAdmin();
			}
		});
	}

	public onUserLogout(): void {
		clearTimeout(this._tokenTimer);
		this.clearAuthDataLS();
		this._isAuthenticated = false;
		this._token = '';
		this.userEmail = '';
		this.redirectToLogin();
	}

	public redirectToAdmin(): void {
		this._router.navigate(['admin']);
	}

	public redirectToLogin(): void {
		this._router.navigate(['auth', 'login']);
	}
}
