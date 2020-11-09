import { createSelector } from '@ngrx/store';
import { IOrdersForm } from 'src/app/components/models/orders-form/orders-form.model';
import { IAppState } from '../states/app.state';

// tslint:disable-next-line: typedef
const ordersFormState = (state: IAppState) => state.ordersForm;

// tslint:disable-next-line: typedef
export const selectOrdersForm = createSelector(
	ordersFormState,
	(state: IOrdersForm) => state
);
