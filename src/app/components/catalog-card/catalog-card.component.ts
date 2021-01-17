import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICatalogElement } from '../models/catalogElement/catalog-element.model';
import { EUserPermission } from 'src/app/components/models/authTokenData/authTokenData.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-catalog-card',
	templateUrl: './catalog-card.component.html',
	styleUrls: ['./catalog-card.component.scss']
})
export class CatalogCardComponent implements OnInit {
	public imgsUrl: string = environment.imgsUrl;
	public userPermission: string = this.authService.getUserPermission();
	public adminPermission: string = EUserPermission.admin;

	@Input()
	public catalogElement: ICatalogElement;

	@Input()
	public isProd: boolean;

	@Output()
	public onAddToCart: EventEmitter<ICatalogElement> = new EventEmitter<ICatalogElement>();

	@Output()
	public onDeleteFromCatalog: EventEmitter<string> = new EventEmitter<string>();

	constructor(
		public authService: AuthService,
	) { }

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
