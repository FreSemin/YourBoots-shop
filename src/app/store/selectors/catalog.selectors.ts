import { createSelector } from '@ngrx/store';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { IAppState } from '../states/app.state';

// tslint:disable-next-line: typedef
const catalogState = (state: IAppState) => state.catalog;

// tslint:disable-next-line: typedef
export const selectCatalog = createSelector(
	catalogState,
	(state: ICatalog) => state
);
