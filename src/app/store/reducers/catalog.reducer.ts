import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { ECatalogActions } from '../actions/catalog.actions';
import { CustomAction } from '../actions/custom.action';
import { initialCatalogState } from '../states/catalog.state';

export function catalogReducer(state: ICatalog = initialCatalogState, action: CustomAction): ICatalog {

	switch (action.type) {

		case ECatalogActions.AddElement:
			return {
				...state,
				isLoading: true,
			};

		case ECatalogActions.AddElementSucces:
			return {
				...state,
				isLoading: false,
			};

		case ECatalogActions.AddElementError:
			return {
				...state,
				isLoading: false,
			};

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

		case ECatalogActions.Clear:
			return {
				...state,
				catalogElements: [],
				isLoading: false,
			};

		case ECatalogActions.GetElementsError:
			return {
				...state,
				isLoading: false,
			};

		case ECatalogActions.UpdateElement:
			return {
				...state,
				isLoading: true,
			};

		case ECatalogActions.UpdateElementSucces:
			return {
				...state,
				isLoading: false,
			};

		case ECatalogActions.UpdateElementError:
			return {
				...state,
				isLoading: false,
			};

		case ECatalogActions.DeleteElement:
			return {
				...state,
				isLoading: true,
			};

		case ECatalogActions.DeleteElementSucces:
			return {
				...state,
				isLoading: false,
			};

		case ECatalogActions.DeleteElementError:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
}
