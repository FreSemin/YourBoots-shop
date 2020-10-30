export interface ICatalogElement {
	title: string;
	img: string;
	priceCurrency: string;
	beforePriceNumber: number;
	currentPriceNumber: number;
	sizes: number[] | number;
	count?: number;
}

export class CatalogElement implements ICatalogElement {
	public title: string;
	public img: string;
	public beforePriceNumber: number;
	public currentPriceNumber: number;
	public priceCurrency: string;
	public sizes: number[] | number;
	public count: number;

	constructor(catalogElement: ICatalogElement, newCount?: number, newSize?: number) {
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
		this.sizes = size;
	}
}
