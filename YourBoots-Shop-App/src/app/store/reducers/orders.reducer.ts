import { IOrders } from 'src/app/components/models/orders/orders.model';
import { CustomAction } from '../actions/custom.action';
import { EOrdersActions } from '../actions/orders.actions';
import { initialOrdersState } from '../states/orders.state';

export function ordersReducer(state: IOrders = initialOrdersState, action: CustomAction): IOrders {

	switch (action.type) {

		// case EOrdersActions.AddElementToOrders:
		// 	return {
		// 		...state,
		// 		isLoading: true,
		// 	};

		// case EOrdersActions.AddElementToOrdersSucces:
		// 	return {
		// 		...state,
		// 		isLoading: false,
		// 	};

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

		case EOrdersActions.ErrorGetOrders:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
