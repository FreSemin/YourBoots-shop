import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

	// tslint:disable-next-line: no-empty
	constructor(
		public catalogService: CatalogService,
	) { }

	public ngOnInit(): void {
		this.catalogService.loadCatalog();
	}

}
