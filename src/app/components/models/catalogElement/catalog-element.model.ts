export interface ICatalogElement {
	_id?: string;  // id from backend
	id?: string;
	title: string;
	img: File | string; // File for put request
	priceCurrency: string;
	beforePriceNumber?: number;
	currentPriceNumber: number;
	sizes: number[];
	count?: number;
}

export class CatalogElement implements ICatalogElement {
	public id: string;
	public title: string;
	public img: File | string;
	public beforePriceNumber: number;
	public currentPriceNumber: number;
	public priceCurrency: string;
	public sizes: number[];
	public count: number;

	constructor(catalogElement: ICatalogElement, newCount?: number, newSize?: number) {

		// tslint:disable-next-line: strict-boolean-expressions
		if (catalogElement._id) {
			this.id = catalogElement._id;
			// tslint:disable-next-line: strict-boolean-expressions
		} else if (catalogElement.id) {
			this.id = catalogElement.id;
		}

		this.title = catalogElement.title;
		this.img = catalogElement.img;
		this.priceCurrency = catalogElement.priceCurrency;
		this.beforePriceNumber = catalogElement.beforePriceNumber;
		this.currentPriceNumber = catalogElement.currentPriceNumber;
		this.count = catalogElement.count;
		this.sizes = catalogElement.sizes;

		if (newCount !== undefined) {
			this.setCount(newCount);
		}

		if (newSize !== undefined) {
			this.setSize(newSize);
		}
	}

	public setCount(count: number): void {
		this.count = count;
	}

	public setSize(size: number): void {
		this.sizes = [];
		this.sizes.push(size);
	}
}
