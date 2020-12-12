import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICatalogElement } from '../models/catalogElement/catalog-element.model';

@Component({
	selector: 'app-catalog-card',
	templateUrl: './catalog-card.component.html',
	styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent implements OnInit {
	public imgsUrl: string = environment.imgsUrl;

	@Input()
	public catalogElement: ICatalogElement;

	@Output()
	public onAddToCart: EventEmitter<ICatalogElement> = new EventEmitter<ICatalogElement>();

	@Output()
	public onDeleteFromCatalog: EventEmitter<string> = new EventEmitter<string>();

	// tslint:disable-next-line: no-empty
	constructor() { }

	public addToCart(): void {
		this.onAddToCart.emit(this.catalogElement);
	}

	public onDelete(): void {
		this.onDeleteFromCatalog.emit(this.catalogElement.id);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
