import { RouterReducerState } from '@ngrx/router-store/src/reducer';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { IOrders } from 'src/app/components/models/orders/orders.model';
import { initialCatalogState } from './catalog.state';
import { initialOrdersState } from './orders.state';

export interface IAppState {
	router?: RouterReducerState;
	catalog: ICatalog;
	orders: IOrders;
}

export const initialAppState: IAppState = {
	catalog: initialCatalogState,
	orders: initialOrdersState,
};

export function getInitialState(): IAppState {
	return initialAppState;
}
