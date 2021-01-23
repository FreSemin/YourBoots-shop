import { IAuthState } from 'src/app/components/models/auth/auth-state.model';

export const initialAuthState: IAuthState = {
  token: '',
  isAuthenticated: false,
  userPermission: '',
  userEmail: '',
  isLoading: false,
};
