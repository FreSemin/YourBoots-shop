import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { catchError, switchMap } from 'rxjs/operators';
import { GetOrdersLS, EOrdersActions, GetOrdersLSSucces, ErrorGetOrders, AddElementToOrders, AddElementToOrdersSucces, ErrorAddOrder, UpdateOrdersLS, UpdateOrdersLSSucces } from '../actions/orders.actions';

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

	@Effect()
	public addOrderElement$: Observable<any> = this._actions$.pipe(
		ofType<AddElementToOrders>(EOrdersActions.AddElementToOrders),
		switchMap(() => this._catalogService.getOrdersLS()),
		switchMap((orderLSElements: ICatalogElement[]) => {
			orderLSElements.push(this._catalogService.orderToAdd);
			this._catalogService.setOrdersLS(orderLSElements);
			return of(new AddElementToOrdersSucces(orderLSElements));
		}),
		catchError(() => of(new ErrorAddOrder()))
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
	) { }
}
