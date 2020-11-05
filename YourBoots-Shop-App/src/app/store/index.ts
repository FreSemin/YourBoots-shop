import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { catalogReducer } from './reducers/catalog.reducer';
import { contactModalReducer } from './reducers/contact-modal.reducer';
import { menuReducer } from './reducers/menu.reducer';
import { ordersFormReducer } from './reducers/orders-form.reducer';
import { ordersReducer } from './reducers/orders.reducer';
import { IAppState } from './states/app.state';

export const appReducers: ActionReducerMap<IAppState, any> = {
	router: routerReducer,
	menu: menuReducer,
	catalog: catalogReducer,
	orders: ordersReducer,
	ordersForm: ordersFormReducer,
	contactModal: contactModalReducer,
};
