export interface IAuthUpState {
	token?: string;
	isAuthenticated?: boolean;
	userPermission?: string;
	userEmail?: string;
	isLoading?: boolean;
}

export interface IAuthState {
	token: string;
	isAuthenticated: boolean;
	userPermission: string;
	userEmail: string;
	isLoading: boolean;
}
