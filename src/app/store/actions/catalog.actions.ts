import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CustomAction } from './custom.action';

export enum ECatalogActions {
	GetElements = '[Catalog] Get Elements',
	GetElementsSucces = '[Catalog] Get Elements Succes',
	GetElementsError = '[Catalog] Get Elements Error',
	AddElement = '[Catalog] Add Element',
	AddElementSucces = '[Catalog] Add Element Succes',
	AddElementError = '[Catalog] Add Element Error',
	UpdateElement = '[Catalog] Update Element',
	UpdateElementSucces = '[Catalog] Update Element Succes',
	UpdateElementError = '[Catalog] Update Element Error',
	DeleteElement = '[Catalog] Delete Element',
	DeleteElementSucces = '[Catalog] Delete Element Succes',
	DeleteElementError = '[Catalog] Delete Element Error',
	Clear = '[Catalog] Clear',
}

export class CatalogGetElements implements CustomAction {
	public readonly type: string = ECatalogActions.GetElements;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogAddElement implements CustomAction {
	public readonly type: string = ECatalogActions.AddElement;

	constructor(public payload: ICatalogElement) { }
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogAddElementSucces implements CustomAction {
	public readonly type: string = ECatalogActions.AddElementSucces;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogAddElementError implements CustomAction {
	public readonly type: string = ECatalogActions.AddElementError;
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
export class CatalogUpdateElement implements CustomAction {
	public readonly type: string = ECatalogActions.UpdateElement;

	constructor(public payload: ICatalogElement) { }
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogUpdateElementSucces implements CustomAction {
	public readonly type: string = ECatalogActions.UpdateElementSucces;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogUpdateElementError implements CustomAction {
	public readonly type: string = ECatalogActions.UpdateElementError;
}
// tslint:disable-next-line: max-classes-per-file
export class CatalogDeleteElement implements CustomAction {
	public readonly type: string = ECatalogActions.DeleteElement;

	constructor(public payload: string) { }
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogDeleteElementSucces implements CustomAction {
	public readonly type: string = ECatalogActions.DeleteElementSucces;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogDeleteElementError implements CustomAction {
	public readonly type: string = ECatalogActions.DeleteElementError;
}

// tslint:disable-next-line: max-classes-per-file
export class CatalogClear implements CustomAction {
	public readonly type: string = ECatalogActions.Clear;
}
