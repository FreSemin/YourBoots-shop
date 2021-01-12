import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';
import { AuthTokenData, IAuthTokenData, IAuthTokenServerData } from 'src/app/components/models/authTokenData/authTokenData.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _token: string = '';
	private _isAuthenticated: boolean = false;
	private _tokenTimer: any;
	private _toMilSec: number = 1000;

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
			this.onAdminLogout();
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
			this._isAuthenticated = true;
		}
	}

	public getToken(): string {
		return this._token;
	}

	public getIsAuth(): boolean {
		return this._isAuthenticated;
	}

	/*
		* Uncommit for creating new admins
		* Exist for create admins accounts
		*	By create hash password
	*/
	public onAdminSingUp(form: NgForm): void {
		if (form.invalid) {
			return;
		}

		const adminAuthData: IAuthData = {
			email: form.value.adminName,
			password: form.value.adminPassword,
		};

		this._http.post(
			'http://localhost:3000/api/auth/admin/signup',
			adminAuthData
		)
			.subscribe((response: any) => {
				form.reset();
			});
	}

	public onAdminLogin(form: NgForm): void {
		if (form.invalid) {
			return;
		}

		const adminAuthData: IAuthData = {
			email: form.value.adminName,
			password: form.value.adminPassword,
		};

		this._http.post<IAuthTokenServerData>(
			'http://localhost:3000/api/auth/admin/login',
			adminAuthData
		).subscribe((response: IAuthTokenServerData) => {
			const token: string = response.token;
			const expiresInDuration: number = response.expiresIn;

			this.userEmail = form.value.adminName;

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

	public onAdminLogout(): void {
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
		this._router.navigate(['login']);
	}
}
