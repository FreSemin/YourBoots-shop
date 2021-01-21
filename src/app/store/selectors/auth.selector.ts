import { createSelector } from '@ngrx/store';
import { IAuthState } from 'src/app/components/models/auth/auth-state.model';
import { IAppState } from '../states/app.state';

// tslint:disable-next-line: typedef
const authState = (state: IAppState) => state.authorization;

// tslint:disable-next-line: typedef
export const selectAuth = createSelector(
  authState,
  (state: IAuthState) => state
);
