import { NgForm } from '@angular/forms';
import { IAuthUpState } from 'src/app/components/models/auth/auth-state.model';
import { CustomAction } from './custom.action';

export enum EAuthActions {
	userSignup = '[Auth] User Sign Up',
	userSignupSuccess = '[Auth] User Sign Up Success',
	userSignupError = '[Auth] User Sign Up Error',
	userLogin = '[Auth] User Log In',
	userLoginSuccess = '[Auth] User Log In Success',
	userLoginError = '[Auth] User Log In Error',
	userLogout = '[Auth] User Log out',
	userLogoutSuccess = '[Auth] User Log out Success',
	userLogoutError = '[Auth] User Log out Error',
	autoAuth = '[Auth] Auto Auth',
	autoAuthSuccess = '[Auth] Auto Auth Succes',
	autoAuthFaile = '[Auth] Auto Auth Faile',
	autoAuthError = '[Auth] Auto Auth Error',
}

// tslint:disable-next-line: max-classes-per-file
export class UserSignup implements CustomAction {
	public readonly type: string = EAuthActions.userSignup;

	constructor(public payload: {
		email: string,
		password: string
	}) { }
}

// tslint:disable-next-line: max-classes-per-file
export class UserSignupSuccess implements CustomAction {
	public readonly type: string = EAuthActions.userSignupSuccess;
}

// tslint:disable-next-line: max-classes-per-file
export class UserSignupError implements CustomAction {
	public readonly type: string = EAuthActions.userSignupError;
}

// tslint:disable-next-line: max-classes-per-file
export class UserLogin implements CustomAction {
	public readonly type: string = EAuthActions.userLogin;

	constructor(public payload: {
		email: string,
		password: string
	}) { }
}

// tslint:disable-next-line: max-classes-per-file
export class UserLoginSuccess implements CustomAction {
	public readonly type: string = EAuthActions.userLoginSuccess;

	constructor(public payload: IAuthUpState) { }
}

// tslint:disable-next-line: max-classes-per-file
export class UserLoginError implements CustomAction {
	public readonly type: string = EAuthActions.userLoginError;
}

// tslint:disable-next-line: max-classes-per-file
export class UserLogout implements CustomAction {
	public readonly type: string = EAuthActions.userLogout;
}

// tslint:disable-next-line: max-classes-per-file
export class UserLogoutSuccess implements CustomAction {
	public readonly type: string = EAuthActions.userLogoutSuccess;

	constructor(public payload: IAuthUpState) { }
}

// tslint:disable-next-line: max-classes-per-file
export class UserLogoutError implements CustomAction {
	public readonly type: string = EAuthActions.userLogoutError;
}

// tslint:disable-next-line: max-classes-per-file
export class AutoAuth implements CustomAction {
	public readonly type: string = EAuthActions.autoAuth;
}

// tslint:disable-next-line: max-classes-per-file
export class AutoAuthSuccess implements CustomAction {
	public readonly type: string = EAuthActions.autoAuthSuccess;

	constructor(public payload: IAuthUpState) { }
}

// tslint:disable-next-line: max-classes-per-file
export class AutoAuthFaile implements CustomAction {
	public readonly type: string = EAuthActions.autoAuthFaile;
}

// tslint:disable-next-line: max-classes-per-file
export class AutoAuthError implements CustomAction {
	public readonly type: string = EAuthActions.autoAuthError;
}
