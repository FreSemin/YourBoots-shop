import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _token: string = '';
	private _isAuthenticated: boolean = false;

	public adminEmail: string = '';

	// tslint:disable-next-line: no-empty
	constructor(
		private _http: HttpClient,
		private _router: Router,
	) { }

	private _setAuthStatus(status: boolean): void {
		this._isAuthenticated = status;
	}

	public getToken(): string {
		return this._token;
	}

	public getAuthStatus(): boolean {
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

		this._http.post<{ token: string }>(
			'http://localhost:3000/api/auth/admin/login',
			adminAuthData
		).subscribe((response: any) => {
			const token: string = response.token;

			this.adminEmail = form.value.adminName;

			this._token = token;

			this._setAuthStatus(true);

			form.reset();

			this.redirectToAdmin();
		});
	}

	public onAdminLogout(): void {
		this._setAuthStatus(false);
		this._token = '';
		this.redirectToLogin();
	}

	public redirectToAdmin(): void {
		this._router.navigate(['admin']);
	}

	public redirectToLogin(): void {
		this._router.navigate(['login']);
	}
}
