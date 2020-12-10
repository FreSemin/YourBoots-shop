import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ECatalogActions, CatalogGetElementsSucces, CatalogGetElementsError, CatalogGetElements, CatalogAddElement, CatalogAddElementSucces, CatalogAddElementError } from '../actions/catalog.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CatalogElement, ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';

@Injectable()
export class CatalogEffects {

	@Effect()
	public getCatalogElements$: Observable<any> = this._actions$.pipe(
		ofType<CatalogGetElements>(ECatalogActions.GetElements),
		switchMap(() => this._catalogService.getCatalogElements()),
		switchMap((catalogElements: ICatalogElement[]) => {
			/* Will convert _id to id */
			catalogElements = catalogElements.map((element: ICatalogElement) => {
				return new CatalogElement(element);
			});
			return of(new CatalogGetElementsSucces(catalogElements));
		}),
		catchError((err: any) => {
			console.log(err);
			return of(new CatalogGetElementsError());
		})
	);

	@Effect()
	public addCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogAddElement>(ECatalogActions.AddElement),
		tap(async (addAction: CatalogAddElement) => {
			await this._http.post(
				'http://localhost:3000/api/catalog',
				addAction.payload
			)
				.toPromise(); // don't work without Promise
		}),
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => this._catalogService.getCatalogElements()),
		switchMap((catalogElements: ICatalogElement[]) => {
			return of(new CatalogAddElementSucces(catalogElements));
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
