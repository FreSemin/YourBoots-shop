import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ECatalogActions, CatalogGetElementsSucces, CatalogGetElementsError, CatalogGetElements, CatalogAddElement, CatalogAddElementSucces, CatalogAddElementError, CatalogDeleteElement, CatalogDeleteElementSucces, CatalogDeleteElementError, CatalogUpdateElement, CatalogUpdateElementError, CatalogUpdateElementSucces } from '../actions/catalog.actions';
import { catchError, delay, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CatalogElement, ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { MainAppService } from 'src/app/services/main-app/main-app.service';

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
			const newCatalogEl: ICatalogElement = addAction.payload;
			const catalogElData: FormData = new FormData();

			catalogElData.append('title', newCatalogEl.title);
			catalogElData.append('img', newCatalogEl.img, newCatalogEl.title);
			catalogElData.append('beforePriceNumber', newCatalogEl.beforePriceNumber.toString());
			catalogElData.append('currentPriceNumber', newCatalogEl.currentPriceNumber.toString());
			catalogElData.append('priceCurrency', newCatalogEl.priceCurrency);
			catalogElData.append('sizes', newCatalogEl.sizes.toString());
			catalogElData.append('count', newCatalogEl.count.toString());

			await this._http.post(
				'http://localhost:3000/api/ctlg',
				catalogElData
			)
				.toPromise(); // don't work without Promise
		}),
		delay(delayTimeOut), // wait for db update (fix problem with view update)
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			this._mainAppService.showSuccesMessage('Create element success!');
			return of(new CatalogAddElementSucces());
		}),
		catchError((err: any) => {
			this._mainAppService.showErrorMessage('Create element error!');
			console.log(err);
			return of(new CatalogAddElementError());
		})
	);

	@Effect()
	public updateCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogUpdateElement>(ECatalogActions.UpdateElement),
		tap(async (updateAction: CatalogUpdateElement) => {
			const updatedElement: ICatalogElement = updateAction.payload;
			let updatedElData: ICatalogElement | FormData = null;

			if (typeof (updatedElement.img) === 'object') {
				updatedElData = new FormData();
				updatedElData.append('id', updatedElement.id);
				updatedElData.append('title', updatedElement.title);
				updatedElData.append('img', updatedElement.img, updatedElement.title);
				updatedElData.append('beforePriceNumber', updatedElement.beforePriceNumber.toString());
				updatedElData.append('currentPriceNumber', updatedElement.currentPriceNumber.toString());
				updatedElData.append('priceCurrency', updatedElement.priceCurrency);
				updatedElData.append('sizes', updatedElement.sizes.toString());
				updatedElData.append('count', updatedElement.count.toString());
			} else {
				updatedElData = updatedElement;
			}

			await this._http.put(
				'http://localhost:3000/api/ctlg/' + updatedElement.id,
				updatedElData
			)
				.toPromise();
		}),
		delay(delayTimeOut),
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			this._mainAppService.showSuccesMessage('Update element success!');
			return of(new CatalogUpdateElementSucces());
		}),
		catchError((err: any) => {
			this._mainAppService.showErrorMessage('Update element error!');
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
			this._mainAppService.showSuccesMessage('Delete element success!');
			return of(new CatalogDeleteElementSucces());
		}),
		catchError((err: any) => {
			this._mainAppService.showErrorMessage('Delete element error!');
			console.log(err);
			return of(new CatalogDeleteElementError());
		})
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
		private _http: HttpClient,
		private _mainAppService: MainAppService,
	) { }
}
