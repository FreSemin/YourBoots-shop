import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { MainAppService } from 'src/app/services/main-app/main-app.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public imgsUrl: string = environment.imgsUrl;

	constructor(
		public _catalogService: CatalogService,
		public modalService: ModalService,
		public _mainAppService: MainAppService,
	) { }

	public ngOnInit(): void {
		this._catalogService.loadCatalog();
		this._catalogService.loadOrders();
		this._mainAppService.setCookiesDuration();
	}
}
