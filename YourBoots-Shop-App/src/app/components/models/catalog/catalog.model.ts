import { ICatalogElement } from '../catalogElement/catalog-element.model';

export interface ICatalog {
	catalogElements: ICatalogElement[];
	isLoading: boolean;
}
