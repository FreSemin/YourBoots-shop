import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICatalogElement, CatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CatalogAddElement } from 'src/app/store/actions/catalog.actions';
import { IAppState } from 'src/app/store/states/app.state';
import { Location } from '@angular/common';
import { CatalogService } from '../catalog/catalog.service';

function convertToNumArr(stringToConvert: string): number[] {
	return stringToConvert.split(' ').map((elString: string) => {
		return +elString;
	});
}

@Injectable({
	providedIn: 'root'
})
export class CardFormService {
	public isEditForm: boolean = false;

	public catalogAddElementForm: FormGroup = new FormGroup({
		catalogAddElementTitle: new FormControl('', Validators.required),
		catalogAddElementImg: new FormControl('card_1.jpg', Validators.required),
		catalogAddElementBeforePrice: new FormControl('', Validators.required),
		catalogAddElementCurrentPrice: new FormControl('', Validators.required),
		catalogAddElementPriceCurrency: new FormControl('BYN', Validators.required),
		catalogAddElementSizes: new FormControl([], Validators.required),
		catalogAddElementCount: new FormControl({ value: 1, disabled: true }, Validators.required),
	});

	constructor(
		private _store: Store<IAppState>,
		private _location: Location,
		private _catalogService: CatalogService,
	) { }

	public setCatalogFormDefValue(): void {
		this.catalogAddElementForm.reset();

		this.catalogAddElementForm.controls['catalogAddElementImg'].setValue('card_1.jpg');
		this.catalogAddElementForm.controls['catalogAddElementCount'].setValue(1);
		this.catalogAddElementForm.controls['catalogAddElementPriceCurrency'].setValue('BYN');
	}

	public addToCataloge(): void {
		const sizesArr: number[] = convertToNumArr(this.catalogAddElementForm.controls['catalogAddElementSizes'].value);
		const beforePrice: number = +this.catalogAddElementForm.controls['catalogAddElementBeforePrice'].value;

		const catalogElement: ICatalogElement = new CatalogElement({
			title: this.catalogAddElementForm.controls['catalogAddElementTitle'].value,
			img: this.catalogAddElementForm.controls['catalogAddElementImg'].value,
			beforePriceNumber: (beforePrice > 0) ? beforePrice : null,
			currentPriceNumber: +this.catalogAddElementForm.controls['catalogAddElementCurrentPrice'].value,
			priceCurrency: this.catalogAddElementForm.controls['catalogAddElementPriceCurrency'].value,
			sizes: sizesArr,
			count: +this.catalogAddElementForm.controls['catalogAddElementCount'].value,
		});

		this._store.dispatch(new CatalogAddElement(catalogElement));

		this.closeForm();
	}

	public updateElement(): void {

		this.closeForm();
	}

	public setCardValues(id: string): void {
		const catalogElement: ICatalogElement = this._catalogService.getCatalogElement(id);

		if (catalogElement) {
			this.catalogAddElementForm.controls['catalogAddElementTitle'].setValue(catalogElement.title);
			this.catalogAddElementForm.controls['catalogAddElementImg'].setValue(catalogElement.img);
			this.catalogAddElementForm.controls['catalogAddElementBeforePrice'].setValue(catalogElement.beforePriceNumber);
			this.catalogAddElementForm.controls['catalogAddElementCurrentPrice'].setValue(catalogElement.currentPriceNumber);
			this.catalogAddElementForm.controls['catalogAddElementPriceCurrency'].setValue(catalogElement.priceCurrency);
			this.catalogAddElementForm.controls['catalogAddElementSizes'].setValue(catalogElement.sizes);
			this.catalogAddElementForm.controls['catalogAddElementCount'].setValue(catalogElement.count);
		}

	}

	public openForm(elementId?: string): void {

		if (elementId !== undefined && elementId !== '') {
			this.setCardValues(elementId);
			this.isEditForm = true;
		}

	}

	public closeForm(): void {
		document.body.style.overflow = 'auto';

		this._location.back();

		this.setCatalogFormDefValue();

		this.isEditForm = false;
	}
}
