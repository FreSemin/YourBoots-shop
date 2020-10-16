import { createSelector } from '@ngrx/store';
import { IOrders } from 'src/app/components/models/orders/orders.model';
import { IAppState } from '../states/app.state';

// tslint:disable-next-line: typedef
const ordersState = (state: IAppState) => state.orders;

// tslint:disable-next-line: typedef
export const selectOrders = createSelector(
	ordersState,
	(state: IOrders) => state
);
