import { RouterReducerState } from '@ngrx/router-store/src/reducer';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { IContactModal } from 'src/app/components/models/contact-modal/contact-modal.model';
import { IMenu } from 'src/app/components/models/menu/menu.model';
import { IOrdersForm } from 'src/app/components/models/orders-form/orders-form.model';
import { IOrders } from 'src/app/components/models/orders/orders.model';
import { initialCatalogState } from './catalog.state';
import { initialContactModalState } from './contact-modal.state';
import { initialMenuState } from './menu.state';
import { initialOrdersFormState } from './orders-form.state';
import { initialOrdersState } from './orders.state';

export interface IAppState {
	router?: RouterReducerState;
	menu: IMenu;
	catalog: ICatalog;
	orders: IOrders;
	ordersForm: IOrdersForm;
	contactModal: IContactModal;
}

export const initialAppState: IAppState = {
	menu: initialMenuState,
	catalog: initialCatalogState,
	orders: initialOrdersState,
	ordersForm: initialOrdersFormState,
	contactModal: initialContactModalState,
};

export function getInitialState(): IAppState {
	return initialAppState;
}
