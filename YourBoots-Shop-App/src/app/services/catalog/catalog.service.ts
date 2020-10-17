import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { IAppState } from 'src/app/store/states/app.state';
import { select, Store } from '@ngrx/store';
import { CatalogGetElements } from 'src/app/store/actions/catalog.actions';
import { selectCatalog } from 'src/app/store/selectors/catalog.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { AddElementToOrders, DeleteOrder, GetOrdersLS, UpdateOrdersLSSucces } from 'src/app/store/actions/orders.actions';
import { of } from 'rxjs';
import { selectOrders } from 'src/app/store/selectors/orders.selectors';
import { switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CatalogService implements OnInit, OnDestroy {
	private static _catalogOrderListKey: string = 'app-shop-order-list';

	public orderToAdd: ICatalogElement = null;
	public indexToDelete: number = null;

	// tslint:disable-next-line: typedef
	public catalog$ = this._store.pipe(select(selectCatalog));

	// tslint:disable-next-line: typedef
	public orders$ = this._store.pipe(select(selectOrders));

	constructor(
		private _http: HttpClient,
		private _store: Store<IAppState>
	) { }

	public loadCatalog(): void {
		this._store.dispatch(new CatalogGetElements());
	}

	public loadOrders(): void {
		this._store.dispatch(new GetOrdersLS());
	}

	public getCatalogElements(): Observable<ICatalog> {
		return this._http.get<ICatalog>(
			`../../../assets/json/catalog.json`
		);
	}

	public getOrdersLS(): Observable<ICatalogElement[]> {
		const ordersListLS: string = localStorage.getItem(CatalogService._catalogOrderListKey);
		let orderList: ICatalogElement[] = [];
		if (Boolean(ordersListLS)) {
			orderList = JSON.parse(localStorage.getItem(CatalogService._catalogOrderListKey));
		}
		return of(orderList);
	}

	public setOrdersLS(ordersElements: ICatalogElement[]): void {
		localStorage.setItem(CatalogService._catalogOrderListKey, JSON.stringify(ordersElements));
		this._store.dispatch(new UpdateOrdersLSSucces(ordersElements));
	}

	public addCartToOrder(elementOrder: ICatalogElement): void {
		this.orderToAdd = elementOrder;
		this._store.dispatch(new AddElementToOrders());
	}

	public deleteOrder(orderIndexToDelete: number): void {
		this.indexToDelete = orderIndexToDelete;
		this._store.dispatch(new DeleteOrder());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void { }
}
