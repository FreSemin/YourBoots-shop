import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	constructor(
		public catalogService: CatalogService
	) { }

	public ngOnInit(): void {
		this.catalogService.loadOrders();
	}

}
