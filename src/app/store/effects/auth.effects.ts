import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { AutoAuth, AutoAuthError, AutoAuthFaile, AutoAuthSuccess, EAuthActions, UserLogin, UserLoginError, UserLoginSuccess, UserLogout, UserLogoutError, UserLogoutSuccess, UserSignup, UserSignupError, UserSignupSuccess } from '../actions/auth.actions';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';
import { IAuthTokenServerData, AuthTokenData, IAuthTokenData } from 'src/app/components/models/authTokenData/authTokenData.model';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IAuthUpState } from 'src/app/components/models/auth/auth-state.model';
import { TagContentType } from '@angular/compiler';

const _toMilSec: number = 1000;

@Injectable()
export class AuthEffects {

	@Effect()
	public userSignup$: Observable<any> = this._actions$.pipe(
		ofType<UserSignup>(EAuthActions.userSignup),
		switchMap((action: UserSignup) => {
			const data: { email: string, password: string } = action.payload;
			const userAuthData: IAuthData = {
				email: data.email,
				password: data.password,
			};

			return this._authService.userSignup(userAuthData);
		}),
		switchMap(() => {
			return of(new UserSignupSuccess());
		}),
		catchError(() => {
			return of(new UserSignupError());
		})
	);

	@Effect()
	public userLogin$: Observable<any> = this._actions$.pipe(
		ofType<UserLogin>(EAuthActions.userLogin),
		switchMap((action: UserLogin) => {
			const data: { email: string, password: string } = action.payload;
			const userAuthData: IAuthData = {
				email: data.email,
				password: data.password,
			};

			return this._authService.userLogin(userAuthData);
		}),
		switchMap((response: IAuthTokenServerData) => {
			const token: string = response.token;
			const expiresInDuration: number = response.expiresIn;
			const authState: IAuthUpState = {
				userPermission: '',
				userEmail: '',
				isAuthenticated: false,
			};

			authState.userPermission = response.userPermission;

			authState.userEmail = response.userEmail;
			this._authService.tempUserEmail = response.userEmail;

			if (token !== '') {
				this._authService.setAuthTimer(expiresInDuration);

				authState.isAuthenticated = true;

				authState.token = token;

				const now: Date = new Date();
				const expirationDate: Date = new Date(now.getTime() + expiresInDuration * _toMilSec);

				this._authService.saveAuthDataLS(new AuthTokenData({
					token,
					expirationDate,
					userEmail: authState.userEmail
				}));

				this._authGuard.redirectToAdmin();

				return of(authState);
			}

		}),
		switchMap((data: IAuthUpState) => {
			return of(new UserLoginSuccess(data));
		}),
		catchError(() => {
			return of(new UserLoginError());
		})
	);

	@Effect()
	public userLogout$: Observable<any> = this._actions$.pipe(
		ofType<UserLogout>(EAuthActions.userLogout),
		switchMap(() => {
			const authState: IAuthUpState = {
				token: '',
				userPermission: '',
				userEmail: '',
				isAuthenticated: false,
			};

			this._authService.clearTimer();
			this._authService.clearAuthDataLS();

			authState.token = '';

			this._authService.tempUserEmail = '';

			this._authService.redirectToLogin();

			return of(authState);
		}),
		switchMap((data: IAuthUpState) => {
			return of(new UserLogoutSuccess(data));
		}),
		catchError(() => {
			return of(new UserLogoutError());
		})
	);

	@Effect()
	public autoAuth$: Observable<any> = this._actions$.pipe(
		ofType<AutoAuth>(EAuthActions.autoAuth),
		switchMap(() => {
			const authData: IAuthTokenData = this._authService.getAuthDataLS();
			const authState: IAuthUpState = {
				token: '',
				userEmail: '',
				isAuthenticated: false,
			};

			if (!authData) {
				return of(null);
			}

			const now: Date = new Date();
			const expiresIn: number = authData.expirationDate.getTime() - now.getTime();

			if (expiresIn > 0) {
				this._authService.setAuthTimer(expiresIn / _toMilSec);

				authState.token = authData.token;
				authState.isAuthenticated = true;

				this._authService.tempUserEmail = authData.userEmail;
				authState.userEmail = authData.userEmail;

				return of(authState);
			}

			if (expiresIn < 0) {
				this._authService.onUserLogout();
				return of(null);
			}
		}),
		switchMap((authState: IAuthUpState) => {
			if (!authState) {
				return of(new AutoAuthFaile());
			}

			return this._authService.getPermission().pipe(
				switchMap((data: { permission: string }) => {
					authState.userPermission = data.permission;

					return of(new AutoAuthSuccess(authState));
				}),
				catchError(() => {
					return of(new AutoAuthError());
				})
			);
		}),
		catchError(() => {
			return of(new AutoAuthError());
		})
	);

	constructor(
		private _actions$: Actions,
		private _authGuard: AuthGuard,
		private _authService: AuthService,
	) { }
}
