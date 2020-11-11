import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ICatalogElement } from '../models/catalogElement/catalog-element.model';

@Component({
	selector: 'app-custom-order-snack-bar',
	templateUrl: './custom-order-snack-bar.component.html',
	styleUrls: ['./custom-order-snack-bar.component.scss']
})
export class CustomOrderSnackBarComponent implements OnInit {
	public imgsUrl: string = environment.imgsUrl;

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ICatalogElement,
		public _snackBar: MatSnackBar
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

}
