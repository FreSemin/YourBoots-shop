import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		public _catalogService: CatalogService
	) { }

	public ngOnInit(): void {
		this._catalogService.loadCatalog();
		console.log(this._catalogService.catalog$);
	}

}
