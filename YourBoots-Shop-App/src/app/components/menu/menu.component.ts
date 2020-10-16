import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	constructor(
		public catalogService: CatalogService
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

}
