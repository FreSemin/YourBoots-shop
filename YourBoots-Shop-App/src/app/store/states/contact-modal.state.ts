import { IContactModal } from 'src/app/components/models/contact-modal/contact-modal.model';

export const initialContactModalState: IContactModal = {
	isActive: false,
	isLoading: false,
	dataToSend: null,
};
