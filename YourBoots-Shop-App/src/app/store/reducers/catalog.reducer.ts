import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { ECatalogActions } from '../actions/catalog.actions';
import { CustomAction } from '../actions/custom.action';
import { initialCatalogState } from '../states/catalog.state';

export function catalogReducer(state: ICatalog = initialCatalogState, action: CustomAction): ICatalog {

	switch (action.type) {

		case ECatalogActions.GetElements:
			return {
				...state,
				isLoading: true,
			};

		case ECatalogActions.GetElementsSucces:
			return {
				...state,
				catalogElements: action.payload,
				isLoading: false,
			};

		case ECatalogActions.GetElementsError:
			return {
				...state,
				isLoading: false,
			};

		case ECatalogActions.Clear:
			return {
				...state,
				catalogElements: [],
				isLoading: false,
			};

		default:
			return state;
	}
};
