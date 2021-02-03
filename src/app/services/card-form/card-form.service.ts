import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICatalogElement, CatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CatalogAddElement, CatalogUpdateElement } from 'src/app/store/actions/catalog.actions';
import { IAppState } from 'src/app/store/states/app.state';
import { CatalogService } from '../catalog/catalog.service';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { mimeType } from '../../components/card-form/mime-type.validator';
import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

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
	public imgPreview: string = '';
	public beforeImg: string = null;

	public catalogAddElementForm: FormGroup = new FormGroup({
		catalogAddElementTitle: new FormControl('', Validators.required),
		catalogAddElementImg: new FormControl(null, {
			validators: [Validators.required], asyncValidators: [mimeType]
		}),
		catalogAddElementBeforePrice: new FormControl('', Validators.required),
		catalogAddElementCurrentPrice: new FormControl('', Validators.required),
		catalogAddElementPriceCurrency: new FormControl('BYN', Validators.required),
		catalogAddElementSizes: new FormControl([], Validators.required),
		catalogAddElementCount: new FormControl({ value: 1, disabled: true }, Validators.required),
	});

	constructor(
		private _store: Store<IAppState>,
		private _router: Router,
		private _catalogService: CatalogService,
	) { }

	public setCatalogFormDefValue(): void {
		this.catalogAddElementForm.reset();

		this.catalogAddElementForm.setValue({
			catalogAddElementTitle: '',
			catalogAddElementImg: null,
			catalogAddElementBeforePrice: '',
			catalogAddElementCurrentPrice: '',
			catalogAddElementPriceCurrency: 'BYN',
			catalogAddElementSizes: [],
			catalogAddElementCount: 1,
		});
	}

	public onPickImg(event: Event): void {
		const file: File = (event.target as HTMLInputElement).files[0];
		const reader: FileReader = new FileReader();

		this.catalogAddElementForm.patchValue(
			{ catalogAddElementImg: file }
		);

		this.catalogAddElementForm.get('catalogAddElementImg').updateValueAndValidity();

		reader.onload = () => {
			this.imgPreview = reader.result as string;
		};

		reader.readAsDataURL(file);
	}

	public addToCataloge(): void {
		const sizesArr: number[] = convertToNumArr(this.catalogAddElementForm.get('catalogAddElementSizes').value);
		const beforePrice: number = +this.catalogAddElementForm.get('catalogAddElementBeforePrice').value;

		const catalogElement: ICatalogElement = new CatalogElement({
			title: this.catalogAddElementForm.get('catalogAddElementTitle').value,
			img: this.catalogAddElementForm.get('catalogAddElementImg').value,
			beforePriceNumber: (beforePrice > 0) ? beforePrice : null,
			currentPriceNumber: +this.catalogAddElementForm.get('catalogAddElementCurrentPrice').value,
			priceCurrency: this.catalogAddElementForm.get('catalogAddElementPriceCurrency').value,
			sizes: sizesArr,
			count: +this.catalogAddElementForm.get('catalogAddElementCount').value,
		});

		this._store.dispatch(new CatalogAddElement(catalogElement));

		this.closeForm();
	}

	public updateElement(elementId: string): void {
		const sizesArr: number[] = convertToNumArr(this.catalogAddElementForm.get('catalogAddElementSizes').value);
		const beforePrice: number = +this.catalogAddElementForm.get('catalogAddElementBeforePrice').value;

		const updatedElement: ICatalogElement = new CatalogElement({
			id: elementId,
			title: this.catalogAddElementForm.get('catalogAddElementTitle').value,
			img: this.catalogAddElementForm.get('catalogAddElementImg').value,
			beforePriceNumber: (beforePrice > 0) ? beforePrice : null,
			currentPriceNumber: +this.catalogAddElementForm.get('catalogAddElementCurrentPrice').value,
			priceCurrency: this.catalogAddElementForm.get('catalogAddElementPriceCurrency').value,
			sizes: sizesArr,
			count: +this.catalogAddElementForm.get('catalogAddElementCount').value,
		});

		this._store.dispatch(new CatalogUpdateElement(updatedElement));

		this.closeForm();
	}

	public setCardValues(id: string): void {
		this._catalogService.catalog$
			.subscribe((catalog: ICatalog) => {
				if (!catalog.isLoading) {
					const catalogElement: ICatalogElement = this._catalogService.getCatalogElement(id);

					if (catalogElement) {
						this.catalogAddElementForm.setValue({
							catalogAddElementTitle: catalogElement.title,
							catalogAddElementImg: catalogElement.img,
							catalogAddElementBeforePrice: catalogElement.beforePriceNumber,
							catalogAddElementCurrentPrice: catalogElement.currentPriceNumber,
							catalogAddElementPriceCurrency: catalogElement.priceCurrency,
							catalogAddElementSizes: catalogElement.sizes.join(' '),
							catalogAddElementCount: catalogElement.count,
						});
						this.beforeImg = this.catalogAddElementForm.get('catalogAddElementImg').value;
					}
				}
			});
	}

	public openForm(elementId?: string): void {
		document.body.style.overflow = 'hidden';

		this.setCatalogFormDefValue();

		if (elementId !== undefined && elementId !== '') {
			this.setCardValues(elementId);
			this.isEditForm = true;
		}

	}

	public closeForm(): void {
		document.body.style.overflow = 'auto';
		this.imgPreview = '';

		this.setCatalogFormDefValue();

		this.isEditForm = false;
		this.beforeImg = null;

		this._router.navigate(['admin']);
	}
}
