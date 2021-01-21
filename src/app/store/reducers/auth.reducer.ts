import { IAuthState } from 'src/app/components/models/auth/auth-state.model';
import { EAuthActions } from '../actions/auth.actions';
import { CustomAction } from '../actions/custom.action';
import { initialAuthState } from '../states/auth.state';

export function authReducer(state: IAuthState = initialAuthState, action: CustomAction): IAuthState {

	switch (action.type) {

		case EAuthActions.userSignup:
			return {
				...state,
				isLoading: true,
			};

		case EAuthActions.userSignupSuccess:
			return {
				...state,
				isLoading: false,
			};

		case EAuthActions.userSignupError:
			return {
				...state,
				isLoading: false,
			};

		case EAuthActions.userLogin:
			return {
				...state,
				isLoading: true,
			};

		case EAuthActions.userLoginSuccess:
			return {
				...state,
				isAuthenticated: action.payload.isAuthenticated,
				userPermission: action.payload.userPermission,
				userEmail: action.payload.userEmail,
				isLoading: false,
			};

		case EAuthActions.userLoginError:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
