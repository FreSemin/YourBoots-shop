import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ECatalogActions, CatalogGetElementsSucces, CatalogGetElementsError, CatalogGetElements, CatalogAddElement, CatalogAddElementSucces, CatalogAddElementError, CatalogDeleteElement, CatalogDeleteElementSucces, CatalogDeleteElementError, CatalogUpdateElement, CatalogUpdateElementError, CatalogUpdateElementSucces } from '../actions/catalog.actions';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CatalogElement, ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';

const delayTimeOut: number = 2000;

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
		delay(delayTimeOut), // wait for db update (fix problem with view update)
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			return of(new CatalogAddElementSucces());
		}),
		catchError((err: any) => {
			console.log(err);
			return of(new CatalogAddElementError());
		})
	);

	@Effect()
	public updateCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogUpdateElement>(ECatalogActions.UpdateElement),
		tap(async (updateAction: CatalogUpdateElement) => {
			const updatedElement: ICatalogElement = updateAction.payload;

			console.log(updatedElement);
		}),
		delay(delayTimeOut), // wait for db update (fix problem with view update)
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			return of(new CatalogUpdateElementSucces());
		}),
		catchError((err: any) => {
			return of(new CatalogUpdateElementError());
		})
	);

	@Effect()
	public deleteCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogDeleteElement>(ECatalogActions.DeleteElement),
		tap(async (deleteAction: CatalogDeleteElement) => {
			const elementId: string = deleteAction.payload;

			await this._http.delete('http://localhost:3000/api/ctlg/' + elementId)
				.toPromise();  // need to wait for async operation
		}),
		delay(delayTimeOut), // wait for db update (fix problem with view update)
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			return of(new CatalogDeleteElementSucces());
		}),
		catchError((err: any) => {
			console.log(err);
			return of(new CatalogDeleteElementError());
		})
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
		private _http: HttpClient,
	) { }
}
