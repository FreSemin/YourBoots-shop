import { createSelector } from '@ngrx/store';
import { IContactModal } from 'src/app/components/models/contact-modal/contact-modal.model';
import { IAppState } from '../states/app.state';

// tslint:disable-next-line: typedef
const contactModalState = (state: IAppState) => state.contactModal;

// tslint:disable-next-line: typedef
export const selectContactModal = createSelector(
	contactModalState,
	(state: IContactModal) => state
);
