import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { catchError, switchMap } from 'rxjs/operators';
import { GetOrdersLS, EOrdersActions, GetOrdersLSSucces, ErrorGetOrders } from '../actions/orders.actions';

@Injectable()
export class OrdersEffects {

	@Effect()
	public getOrders$: Observable<any> = this._actions$.pipe(
		ofType<GetOrdersLS>(EOrdersActions.GetOrdersLS),
		switchMap(() => this._catalogService.getOrdersLS()),
		switchMap((orderLSElements: ICatalogElement[]) => {
			return of(new GetOrdersLSSucces(orderLSElements));
		}),
		catchError(() => of(new ErrorGetOrders()))
	);

	// @Effect()
	// public addOrderElements$: Observable<any> = this._actions$.pipe(
	// ofType<AddElementToOrders>(EOrdersActions.AddElementToOrders),
	// switchMap((elementOrder: ICatalogElement) => this.)
	// switchMap(() => this._catalogService.getCatalogElements()),
	// switchMap((catalog: ICatalog) => {
	// return of(new CatalogGetElementsSucces(catalog.catalogElements));
	// }),
	// catchError((err: any) => {
	// console.log(err);
	// return of(new CatalogGetElementsError());
	// })
	// );

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
	) { }
}
