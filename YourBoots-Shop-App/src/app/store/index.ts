import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { catalogReducer } from './reducers/catalog.reducer';
import { ordersReducer } from './reducers/orders.reducer';
import { IAppState } from './states/app.state';

export const appReducers: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	catalog: catalogReducer,
	orders: ordersReducer,
};
