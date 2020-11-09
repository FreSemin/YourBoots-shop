import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CustomAction } from './custom.action';

export enum ECatalogActions {
	GetElements = '[Catalog] Get Elements',
	GetElementsSucces = '[Catalog] Get Elements Succes',
	GetElementsError = '[Catalog] Get Elements Error',
	Clear = '[Catalog] Clear',
}

export class CatalogGetElements implements CustomAction {
	public readonly type: string = ECatalogActions.GetElements;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogGetElementsSucces implements CustomAction {
	public readonly type: string = ECatalogActions.GetElementsSucces;

	constructor(public payload: ICatalogElement[]) { }
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogGetElementsError implements CustomAction {
	public readonly type: string = ECatalogActions.GetElementsError;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogClear implements CustomAction {
	public readonly type: string = ECatalogActions.Clear;
}
