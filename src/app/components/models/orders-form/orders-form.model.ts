import { ICatalogElement } from '../catalogElement/catalog-element.model';

export interface IOrdersDataToSend {
	userName: string;
	userTel: string;
	userAdress: string;
	userOrders: any;
	beforePrice: number;
	currentPrice: number;
}

export interface IOrdersForm {
	dataToSend: IOrdersDataToSend;
	isLoading: boolean;
}
