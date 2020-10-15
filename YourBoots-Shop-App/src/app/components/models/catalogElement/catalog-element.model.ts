export interface ICatalogElement {
	title: string;
	img: string;
	priceCurrency: string;
	beforePriceNumber: number;
	currentPriceNumber: number;
	sizes: number[];
	count?: number;
}

export class CatalogElement implements ICatalogElement {
	public title: string;
	public img: string;
	public beforePriceNumber: number;
	public currentPriceNumber: number;
	public priceCurrency: string;
	public sizes: number[];
	public count: number;

	constructor(catalogElement: ICatalogElement) {
		this.title = catalogElement.title;
		this.img = catalogElement.img;
		this.priceCurrency = catalogElement.priceCurrency;
		this.beforePriceNumber = catalogElement.beforePriceNumber;
		this.currentPriceNumber = catalogElement.currentPriceNumber;
		this.sizes = catalogElement.sizes;
		this.count = catalogElement.count;
	}
}
