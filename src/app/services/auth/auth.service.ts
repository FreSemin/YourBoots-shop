import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthState } from 'src/app/components/models/auth/auth-state.model';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';
import { AuthTokenData, EUserPermission, IAuthTokenData, IAuthTokenServerData } from 'src/app/components/models/authTokenData/authTokenData.model';
import { AutoAuth, UserLogin, UserLogout, UserSignup } from 'src/app/store/actions/auth.actions';
import { selectAuth } from 'src/app/store/selectors/auth.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { environment } from 'src/environments/environment';

const BACKEND_URL: string = environment.apiUrl;

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private _tokenTimer: any;
	private _toMilSec: number = 1000;
	private _authState: IAuthState;

	// tslint:disable-next-line: typedef
	private _EPermissions = EUserPermission;

	public auth$: Observable<IAuthState> = this._store.pipe(select(selectAuth));
	public tempUserEmail: string = '';  // need for send get user permission request

	constructor(
		private _http: HttpClient,
		private _router: Router,
		private _store: Store<IAppState>,
	) {
		this.auth$.subscribe((state: IAuthState) => {
			this._authState = state;
		});
	}

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

	public clearTimer(): void {
		clearTimeout(this._tokenTimer);
	}

	public autoAuthUser(): void {
		this._store.dispatch(new AutoAuth());
	}

	public getToken(): string {
		return this._authState.token;
	}

	public getIsAuth(): boolean {
		return this._authState.isAuthenticated;
	}

	public getUserEmail(): string {
		return this._authState.userEmail;
	}

	public getUserPermission(): string {
		return this._authState.userPermission;
	}

	public getPermission(): Observable<{ permission: string }> {
		return this._http.get<{ permission: string }>(
			`${BACKEND_URL}/auth/permission/${this.tempUserEmail}`,
		);
	}

	public checkForAdminPermission(): boolean {
		const userPermission: string = this._authState.userPermission;

		if (userPermission !== this._EPermissions.admin) {
			return false;
		}

		return true;
	}

	public onUserSingup(form: NgForm): void {
		if (form.invalid) {
			form.controls['userEmail'].markAsTouched();
			form.controls['userPassword'].markAsTouched();

			return;
		}

		this._store.dispatch(new UserSignup({
			email: form.value.userEmail,
			password: form.value.userPassword,
		}));

		form.reset();
	}

	public userSignup(signupData: {
		email: string,
		password: string,
	}): Observable<any> {
		return this._http.post<any>(
			`${BACKEND_URL}/auth/user/signup`,
			signupData
		);
	}

	public onUserLogin(form: NgForm): void {
		const authData: IAuthData = {
			email: '',
			password: '',
		};

		if (form.invalid) {
			form.controls['loginEmail'].markAsTouched();
			form.controls['loginPassword'].markAsTouched();

			return;
		}

		authData.email = form.value.loginEmail;
		authData.password = form.value.loginPassword;

		this.dispatchUserLogin(authData);

		/*
			Show errors if request error
			Need fix with react forms
			Expected behavior: redirect before see errors
		*/
		form.controls['loginEmail'].setErrors({ incorrect: true });
		form.controls['loginPassword'].setErrors({ incorrect: true });
	}

	public dispatchUserLogin(loginData: IAuthData): void {
		this._store.dispatch(new UserLogin({
			email: loginData.email,
			password: loginData.password,
		}));
	}

	public onUserLogout(): void {
		this._store.dispatch(new UserLogout());
	}

	public userLogin(loginData: {
		email: string,
		password: string,
	}): Observable<IAuthTokenServerData> {
		return this._http.post<IAuthTokenServerData>(
			`${BACKEND_URL}/auth/user/login`,
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
