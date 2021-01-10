import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CatalogService } from 'src/app/services/catalog/catalog.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
	// public catalogAddElementForm: FormGroup = this.catalogService.catalogAddElementForm;

	// tslint:disable-next-line: no-empty
	constructor(
		public catalogService: CatalogService,
		public authService: AuthService,
	) { }

	public ngOnInit(): void {
		this.catalogService.loadCatalog();
	}

}
