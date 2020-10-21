import { IOrders } from 'src/app/components/models/orders/orders.model';
import { CustomAction } from '../actions/custom.action';
import { EOrdersActions } from '../actions/orders.actions';
import { initialOrdersState } from '../states/orders.state';

export function ordersReducer(state: IOrders = initialOrdersState, action: CustomAction): IOrders {

	switch (action.type) {

		case EOrdersActions.GetOrdersLS:
			return {
				...state,
				isLoading: true,
			};

		case EOrdersActions.GetOrdersLSSucces:
			return {
				...state,
				ordersElements: action.payload,
				isLoading: false,
			};

		case EOrdersActions.AddElementToOrders:
			return {
				...state,
				isLoading: true,
			};

		case EOrdersActions.AddElementToOrdersSucces:
			return {
				...state,
				ordersElements: action.payload,
				isLoading: false,
			};

		case EOrdersActions.ErrorGetOrders:
			return {
				...state,
				isLoading: false,
			};

		case EOrdersActions.UpdateOrdersLS:
			return {
				...state,
				isLoading: true,
			};

		case EOrdersActions.UpdateOrdersLSSucces:
			return {
				...state,
				ordersElements: action.payload,
				isLoading: false,
			};

		case EOrdersActions.DeleteOrder:
			return {
				...state,
				isLoading: true,
			};

		case EOrdersActions.DeleteOrderSucces:
			return {
				...state,
				ordersElements: action.payload,
				isLoading: false,
			};

		case EOrdersActions.ErrorDeleteOrder:
			return {
				...state,
				isLoading: false,
			};

		case EOrdersActions.ClearOrdersList:
			return {
				...state,
				ordersElements: [],
				isLoading: true,
			};

		case EOrdersActions.ErrorClearOrdersList:
			return {
				...state,
				isLoading: false,
			};

		case EOrdersActions.ClearOrdersListSucces:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
