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
				token: action.payload.token,
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

		case EAuthActions.userLogout:
			return {
				...state,
				isLoading: true,
			};

		case EAuthActions.userLogoutSuccess:
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: action.payload.isAuthenticated,
				userPermission: action.payload.userPermission,
				userEmail: action.payload.userEmail,
				isLoading: false,
			};

		case EAuthActions.userLogoutError:
			return {
				...state,
				isLoading: false,
			};

		case EAuthActions.autoAuth:
			return {
				...state,
				isLoading: true,
			};

		case EAuthActions.autoAuthSuccess:
			return {
				...state,
				token: action.payload.token,
				isAuthenticated: action.payload.isAuthenticated,
				// userPermission: action.payload.userPermission,
				userEmail: action.payload.userEmail,
				isLoading: false,
			};

		case EAuthActions.autoAuthFaile:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
			};

		case EAuthActions.autoAuthError:
			return {
				...state,
				isLoading: false,
			};

		case EAuthActions.getUserPermissionSR:
			return {
				...state,
				isLoading: true,
			};

		case EAuthActions.getUserPermissionSRSuccess:
			return {
				...state,
				userPermission: action.payload.userPermission,
				isLoading: false,
			};

		case EAuthActions.getUserPermissionSRError:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
