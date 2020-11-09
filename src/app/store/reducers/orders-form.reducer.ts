import { IOrdersForm } from 'src/app/components/models/orders-form/orders-form.model';
import { CustomAction } from '../actions/custom.action';
import { EOrdersFormActions } from '../actions/orders-form.actions';
import { initialOrdersFormState } from '../states/orders-form.state';

export function ordersFormReducer(state: IOrdersForm = initialOrdersFormState, action: CustomAction): IOrdersForm {

	switch (action.type) {

		case EOrdersFormActions.SendData:
			return {
				...state,
				isLoading: true,
			};

		case EOrdersFormActions.SendDataSucces:
			return {
				...state,
				dataToSend: action.payload,
				isLoading: false,
			};

		case EOrdersFormActions.DataSend:
			return {
				...state,
				dataToSend: null,
				isLoading: false,
			};

		case EOrdersFormActions.SendDataError:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
