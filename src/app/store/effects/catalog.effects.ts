import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ECatalogActions, CatalogGetElementsSucces, CatalogGetElementsError, CatalogGetElements, CatalogAddElement, CatalogAddElementSucces, CatalogAddElementError, CatalogDeleteElement, CatalogDeleteElementSucces, CatalogDeleteElementError, CatalogUpdateElement, CatalogUpdateElementError, CatalogUpdateElementSucces } from '../actions/catalog.actions';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CatalogElement, ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { MainAppService } from 'src/app/services/main-app/main-app.service';
import { ISnackBarData } from 'src/app/components/models/snackBar/snack-bar-data.model';
import { environment } from 'src/environments/environment';

const BACKEND_URL: string = environment.apiUrl;

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
		switchMap((addAction: CatalogAddElement) => {
			const newCatalogEl: ICatalogElement = addAction.payload;
			const catalogElData: FormData = new FormData();

			catalogElData.append('title', newCatalogEl.title);
			catalogElData.append('img', newCatalogEl.img, newCatalogEl.title);
			catalogElData.append('beforePriceNumber', newCatalogEl.beforePriceNumber.toString());
			catalogElData.append('currentPriceNumber', newCatalogEl.currentPriceNumber.toString());
			catalogElData.append('priceCurrency', newCatalogEl.priceCurrency);
			catalogElData.append('sizes', newCatalogEl.sizes.toString());
			catalogElData.append('count', newCatalogEl.count.toString());

			return this._http.post(
				BACKEND_URL + '/ctlg',
				catalogElData
			);
		}),
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			const snackBarData: ISnackBarData = {
				text: 'Create element success!',
				isLogin: false,
			};

			this._mainAppService.showDataSuccesMessage(snackBarData);
			return of(new CatalogAddElementSucces());
		}),
		catchError((err: any) => {
			const snackBarData: ISnackBarData = {
				text: 'Create element error!',
				isLogin: false,
			};

			this._mainAppService.showDataErrorMessage(snackBarData);
			console.log(err);
			return of(new CatalogAddElementError());
		})
	);

	@Effect()
	public updateCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogUpdateElement>(ECatalogActions.UpdateElement),
		switchMap((updateAction: CatalogUpdateElement) => {
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

			return this._http.put(
				`${BACKEND_URL}/ctlg/${updatedElement.id}`,
				updatedElData
			);
		}),
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			const snackBarData: ISnackBarData = {
				text: 'Update element success!',
				isLogin: false,
			};

			this._mainAppService.showDataSuccesMessage(snackBarData);
			return of(new CatalogUpdateElementSucces());
		}),
		catchError((err: any) => {
			const snackBarData: ISnackBarData = {
				text: 'Update element error!',
				isLogin: false,
			};

			this._mainAppService.showDataErrorMessage(snackBarData);
			return of(new CatalogUpdateElementError());
		})
	);

	@Effect()
	public deleteCatalogElement$: Observable<any> = this._actions$.pipe(
		ofType<CatalogDeleteElement>(ECatalogActions.DeleteElement),
		switchMap((deleteAction: CatalogDeleteElement) => {
			const elementId: string = deleteAction.payload;

			return this._http.delete(`${BACKEND_URL}/ctlg/${elementId}`);
		}),
		tap(() => this._catalogService.loadCatalog()),
		switchMap(() => {
			const snackBarData: ISnackBarData = {
				text: 'Delete element success!',
				isLogin: false,
			};

			this._mainAppService.showDataSuccesMessage(snackBarData);
			return of(new CatalogDeleteElementSucces());
		}),
		catchError((err: any) => {
			const snackBarData: ISnackBarData = {
				text: 'Delete element error!',
				isLogin: false,
			};

			this._mainAppService.showDataErrorMessage(snackBarData);
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
