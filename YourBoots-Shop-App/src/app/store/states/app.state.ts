import { RouterReducerState } from '@ngrx/router-store/src/reducer';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { IOrdersForm } from 'src/app/components/models/orders-form/orders-form.model';
import { IOrders } from 'src/app/components/models/orders/orders.model';
import { initialCatalogState } from './catalog.state';
import { initialOrdersFormState } from './orders-form.state';
import { initialOrdersState } from './orders.state';

export interface IAppState {
	router?: RouterReducerState;
	catalog: ICatalog;
	orders: IOrders;
	ordersForm: IOrdersForm;
}

export const initialAppState: IAppState = {
	catalog: initialCatalogState,
	orders: initialOrdersState,
	ordersForm: initialOrdersFormState,
};

export function getInitialState(): IAppState {
	return initialAppState;
}
