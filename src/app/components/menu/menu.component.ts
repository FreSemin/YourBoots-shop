import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { MainAppService } from 'src/app/services/main-app/main-app.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public imgsUrl: string = environment.imgsUrl;

	constructor(
		public mainAppService: MainAppService,
		public catalogService: CatalogService
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }
}
