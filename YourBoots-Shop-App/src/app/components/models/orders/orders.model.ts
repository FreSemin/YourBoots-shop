import { ICatalogElement } from '../catalogElement/catalog-element.model';

export interface IOrders {
	ordersElements: ICatalogElement[];
	isLoading: boolean;
}
