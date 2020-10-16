import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CustomAction } from './custom.action';

export enum EOrdersActions {
	AddElementToOrders = '[Orders] Add Element to Orders',
	AddElementToOrdersSucces = '[Orders] Add Element to Orders Succes',
	DeleteOrder = '[Orders] Delete Order',
	DeleteOrderSucces = '[Orders] Delete Order Succes',
	GetOrdersLS = '[Orders] Get Orders from LS',
	GetOrdersLSSucces = '[Orders] Get Orders from LS Succes',
	UpdateOrdersLS = '[Orders] Update Orders LS',
	UpdateOrdersLSSucces = '[Orders] Update Orders LS Succes',
	ErrorGetOrders = '[Orders] Get Orders Error',
	ErrorAddOrder = '[Orders] Add Order Error',
}

// tslint:disable-next-line: max-classes-per-file
export class GetOrdersLS implements CustomAction {
	public readonly type: string = EOrdersActions.GetOrdersLS;
}

// tslint:disable-next-line: max-classes-per-file
export class GetOrdersLSSucces implements CustomAction {
	public readonly type: string = EOrdersActions.GetOrdersLSSucces;

	constructor(public payload: ICatalogElement[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class ErrorGetOrders implements CustomAction {
	public readonly type: string = EOrdersActions.ErrorGetOrders;
}

// tslint:disable-next-line: max-classes-per-file
export class AddElementToOrders implements CustomAction {
	public readonly type: string = EOrdersActions.AddElementToOrders;
}

// tslint:disable-next-line: max-classes-per-file
export class AddElementToOrdersSucces implements CustomAction {
	public readonly type: string = EOrdersActions.AddElementToOrdersSucces;

	constructor(public payload: ICatalogElement[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class ErrorAddOrder implements CustomAction {
	public readonly type: string = EOrdersActions.ErrorAddOrder;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateOrdersLS implements CustomAction {
	public readonly type: string = EOrdersActions.UpdateOrdersLS;
}

// tslint:disable-next-line: max-classes-per-file
export class UpdateOrdersLSSucces implements CustomAction {
	public readonly type: string = EOrdersActions.UpdateOrdersLSSucces;

	constructor(public payload: ICatalogElement[]) { }
}
