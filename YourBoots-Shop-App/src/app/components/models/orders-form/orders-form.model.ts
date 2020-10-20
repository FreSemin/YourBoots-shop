import { ICatalogElement } from '../catalogElement/catalog-element.model';

export interface IOrdersDataToSend {
	userName: string;
	userTel: string;
	userAdress: string;
	userOrders: any;
}

export interface IOrdersForm {
	dataToSend: IOrdersDataToSend;
	isLoading: boolean;
}
