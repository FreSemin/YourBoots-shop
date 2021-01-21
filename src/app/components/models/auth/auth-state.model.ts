export interface IAuthUpState {
	isAuthenticated?: boolean;
	userPermission?: string;
	userEmail?: string;
	isLoading?: boolean;
}

export interface IAuthState {
	isAuthenticated: boolean;
	userPermission: string;
	userEmail: string;
	isLoading: boolean;
}
