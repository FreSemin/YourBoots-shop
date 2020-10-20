import { Component, DoCheck, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
	public imgsUrl: string = environment.imgsUrl;

	constructor(
		public catalogService: CatalogService
	) { }

	public ngOnInit(): void {
		this.catalogService.loadOrders();
	}

	public ngDoCheck(): void {
		this.catalogService.calcOrdersSum();
	}
}
