import { IMenu } from 'src/app/components/models/menu/menu.model';
import { CustomAction } from '../actions/custom.action';
import { EMenuActions } from '../actions/menu.actions';
import { initialMenuState } from '../states/menu.state';

export function menuReducer(state: IMenu = initialMenuState, action: CustomAction): IMenu {

	switch (action.type) {

		case EMenuActions.OpenMenuEnd:
			return {
				...state,
				isMMenuActive: true,
				isAnimation: true,
			};

		case EMenuActions.CloseMenuStart:
			return {
				...state,
				isAnimation: false,
			};

		case EMenuActions.CloseMenuEnd:
			return {
				...state,
				isMMenuActive: false,
			};

		default:
			return state;
	}
}
