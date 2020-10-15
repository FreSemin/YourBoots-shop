import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { catalogReducer } from './reducers/catalog.reducer';
import { IAppState } from './states/app.state';

export const appReducers: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	catalog: catalogReducer,
};
