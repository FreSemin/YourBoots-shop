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
	ClearOrdersList = '[Orders] Clear Orders List',
	ClearOrdersListSucces = '[Orders] Clear Orders List Succes',
	ErrorClearOrdersList = '[Orders] Clear Orders List Error',
	ErrorGetOrders = '[Orders] Get Orders Error',
	ErrorAddOrder = '[Orders] Add Order Error',
	ErrorDeleteOrder = '[Orders] Delete Order Error',
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

// tslint:disable-next-line: max-classes-per-file
export class DeleteOrder implements CustomAction {
	public readonly type: string = EOrdersActions.DeleteOrder;
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteOrderSucces implements CustomAction {
	public readonly type: string = EOrdersActions.DeleteOrderSucces;

	constructor(public payload: ICatalogElement[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class ErrorDeleteOrder implements CustomAction {
	public readonly type: string = EOrdersActions.ErrorDeleteOrder;
}

// tslint:disable-next-line: max-classes-per-file
export class ClearOrdersList implements CustomAction {
	public readonly type: string = EOrdersActions.ClearOrdersList;
}

// tslint:disable-next-line: max-classes-per-file
export class ErrorClearOrdersList implements CustomAction {
	public readonly type: string = EOrdersActions.ErrorClearOrdersList;
}

// tslint:disable-next-line: max-classes-per-file
export class ClearOrdersListSucces implements CustomAction {
	public readonly type: string = EOrdersActions.ClearOrdersListSucces;
}
