import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ICatalogElement } from '../models/catalogElement/catalog-element.model';

@Component({
	selector: 'app-order-card',
	templateUrl: './order-card.component.html',
	styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
	@Input()
	public orderIndex: number;

	@Input()
	public orderElement: ICatalogElement;

	@Output()
	public onDeleteOrder: EventEmitter<number> = new EventEmitter<number>();

	constructor(public catalogService: CatalogService) { }

	public deleteOrder(): void {
		this.onDeleteOrder.emit(this.orderIndex);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

}
