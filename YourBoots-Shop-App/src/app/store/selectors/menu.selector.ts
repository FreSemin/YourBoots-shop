import { createSelector } from '@ngrx/store';
import { IMenu } from 'src/app/components/models/menu/menu.model';
import { IAppState } from '../states/app.state';

// tslint:disable-next-line: typedef
const menuState = (state: IAppState) => state.menu;

// tslint:disable-next-line: typedef
export const selectMenu = createSelector(
	menuState,
	(state: IMenu) => state
);
