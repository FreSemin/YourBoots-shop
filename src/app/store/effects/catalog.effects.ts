import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ECatalogActions, CatalogGetElementsSucces, CatalogGetElementsError, CatalogGetElements, CatalogAddElement, CatalogAddElementSucces, CatalogAddElementError } from '../actions/catalog.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CatalogEffects {

	@Effect()
	public getCatalogElements$: Observable<any> = this._actions$.pipe(
		ofType<CatalogGetElements>(ECatalogActions.GetElements),
		switchMap(() => this._catalogService.getCatalogElements()),
		switchMap((catalog: ICatalog) => {
			return of(new CatalogGetElementsSucces(catalog.catalogElements));
		}),
		catchError((err: any) => {
			console.log(err);
			return of(new CatalogGetElementsError());
		})
	);

	@Effect()
	public addCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogAddElement>(ECatalogActions.AddElement),
		switchMap(() => this._catalogService.getCatalogElements()),
		switchMap((catalog: ICatalog) => {
			this._http.post(
				'http://localhost:3000/api/catalog',
				{
					title: 'new some cart sneakers',
					img: 'card_1.jpg',
					beforePriceNumber: 111,
					currentPriceNumber: 60,
					priceCurrency: 'BR',
					// tslint:disable-next-line: no-magic-numbers
					sizes: [41, 42, 43, 44],
					count: 1,
				}
			);
			// .subscribe(() => {
			// })

			catalog.catalogElements.push({
				title: 'new some cart sneakers',
				img: 'card_1.jpg',
				beforePriceNumber: 111,
				currentPriceNumber: 60,
				priceCurrency: 'BR',
				// tslint:disable-next-line: no-magic-numbers
				sizes: [41, 42, 43, 44],
				count: 1,
			});
			return of(new CatalogAddElementSucces(catalog.catalogElements));
		}),
		catchError((err: any) => {
			console.log(err);
			return of(new CatalogAddElementError());
		})
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
		private _http: HttpClient,
	) { }
}
