import { RouterReducerState } from '@ngrx/router-store/src/reducer';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { initialCatalogState } from './catalog.state';

export interface IAppState {
	router?: RouterReducerState;
	catalog: ICatalog;
}

export const initialAppState: IAppState = {
	catalog: initialCatalogState,
};

export function getInitialState(): IAppState {
	return initialAppState;
}
