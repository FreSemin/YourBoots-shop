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
