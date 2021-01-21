import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/components/models/auth/auth-state.model';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';
import { AuthTokenData, EUserPermission, IAuthTokenData, IAuthTokenServerData } from 'src/app/components/models/authTokenData/authTokenData.model';
import { UserLogin } from 'src/app/store/actions/auth.actions';
import { selectAuth } from 'src/app/store/selectors/auth.selector';
import { IAppState } from 'src/app/store/states/app.state';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _token: string = '';
	private _tokenTimer: any;
	private _toMilSec: number = 1000;

	public _isAuthenticated: boolean = false;
	public _userPermission: string = '';

	public userEmail: string = '';

	public auth$: Observable<IAuthState> = this._store.pipe(select(selectAuth));

	// tslint:disable-next-line: no-empty
	constructor(
		private _http: HttpClient,
		private _router: Router,
		private _store: Store<IAppState>,
	) { }

	public saveAuthDataLS(data: IAuthTokenData): void {
		localStorage.setItem('token', data.token);
		localStorage.setItem('expiration', data.expirationDate.toISOString());
		localStorage.setItem('userEmail', data.userEmail);
	}

	public clearAuthDataLS(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('expiration');
		localStorage.removeItem('userEmail');
	}

	public getAuthDataLS(): any {
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

	public setAuthTimer(duration: number): void {
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
		// let res:  boolean;
		// this.auth$.subscribe((data: any) => {
		// 	res = data.isAuthenticated;
		// });
		// return res;
		return this._isAuthenticated;
	}

	public getUserPermission(): string {
		// let res: string;
		// this.auth$.subscribe((data: any) => {
		// 	res = data.userPermission;
		// });
		// return res;
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

		this._store.dispatch(new UserLogin({
			email: form.value.loginEmail,
			password: form.value.loginPassword,
		}));
	}

	public onUserLogout(): void {
		clearTimeout(this._tokenTimer);
		this.clearAuthDataLS();
		this._isAuthenticated = false;
		this._token = '';
		this.userEmail = '';
		this.redirectToLogin();
	}

	public userLogin(loginData: {
		email: string,
		password: string,
	}): Observable<IAuthTokenServerData> {
		return this._http.post<IAuthTokenServerData>(
			'http://localhost:3000/api/auth/user/login',
			loginData
		);
	}

	public redirectToAdmin(): void {
		this._router.navigate(['admin']);
	}

	public redirectToLogin(): void {
		this._router.navigate(['auth', 'login']);
	}
}
