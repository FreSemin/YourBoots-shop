import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
	public imgsUrl: string = environment.imgsUrl;
	public isMMenuActive: boolean = false; // TODO: add to ngrx logic
	public menuAnimation: boolean = true;

	constructor(
		public catalogService: CatalogService
	) { }

	public showMenu(): void {
		this.isMMenuActive = true;
		this.menuAnimation = true;
		document.body.style.overflow = 'hidden';
	}

	public hideMenu(): void {
		this.menuAnimation = false;
		setTimeout(() => {
			this.isMMenuActive = false;
		// tslint:disable-next-line: no-magic-numbers
		}, 1000);
		document.body.style.overflow = 'auto';
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }
}
