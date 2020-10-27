import { IContactModal } from 'src/app/components/models/contact-modal/contact-modal.model';
import { EContactModalActions } from '../actions/contact-modal.actions';
import { CustomAction } from '../actions/custom.action';
import { initialContactModalState } from '../states/contact-modal.state';

export function contactModalReducer(state: IContactModal = initialContactModalState, action: CustomAction): IContactModal {

	switch (action.type) {

		case EContactModalActions.OnActive:
			return {
				...state,
				isActive: true,
			};

		case EContactModalActions.OnClose:
			return {
				...state,
				isActive: false,
			};

		case EContactModalActions.OnSendData:
			return {
				...state,
				isLoading: true,
			};

		case EContactModalActions.OnSendDataSucces:
			return {
				...state,
				dataToSend: action.payload,
				isLoading: false,
			};

		case EContactModalActions.OnSendDataError:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
