import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatalogElement, ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { IAppState } from 'src/app/store/states/app.state';
import { select, Store } from '@ngrx/store';
import { CatalogGetElements } from 'src/app/store/actions/catalog.actions';
import { selectCatalog } from 'src/app/store/selectors/catalog.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';
import { AddElementToOrders, ClearOrdersList, DeleteOrder, GetOrdersLS, UpdateOrdersLSSucces } from 'src/app/store/actions/orders.actions';
import { of } from 'rxjs';
import { selectOrders } from 'src/app/store/selectors/orders.selectors';
import { IOrders } from 'src/app/components/models/orders/orders.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SendData } from 'src/app/store/actions/orders-form.actions';
import { selectOrdersForm } from 'src/app/store/selectors/orders-form.selectors';
import { IOrdersDataToSend } from 'src/app/components/models/orders-form/orders-form.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CatalogService implements OnInit, OnDestroy {
	private static _catalogOrderListKey: string = 'app-shop-order-list';

	public assetsUrl: string = environment.assetsUrl;

	public orderToAdd: ICatalogElement = null;

	public indexToDelete: number = null;
	public ordersCurrentSum: number = 0;
	public ordersBeforeSum: number = 0;

	public ordersCountsList: number[] = [];
	public ordersSizesList: number[] = [];

	// tslint:disable-next-line: typedef
	public catalog$ = this._store.pipe(select(selectCatalog));

	// tslint:disable-next-line: typedef
	public orders$ = this._store.pipe(select(selectOrders));

	// tslint:disable-next-line: typedef
	public ordersForm$ = this._store.pipe(select(selectOrdersForm));

	public ordersForm: FormGroup = new FormGroup({
		userName: new FormControl('', Validators.required),
		userPhone: new FormControl('', Validators.pattern('[0-9]{10}')),
		userAdress: new FormControl('', Validators.required),
	});

	public dataToSend: IOrdersDataToSend = {
		userName: '',
		userTel: '',
		userAdress: '',
		userOrders: [],
		beforePrice: null,
		currentPrice: null,
	};

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
			`${this.assetsUrl}json/catalog.json`
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

	public clearOrders(): void {
		this._store.dispatch(new ClearOrdersList());
	}

	public getCoutList(): void {
		let ordersCountInputs: HTMLCollectionOf<Element>;

		this.ordersCountsList = [];
		ordersCountInputs = document.getElementsByClassName('cart__order-cout');

		Array.from(ordersCountInputs).forEach(((orderCountInput: HTMLInputElement) => {
			this.ordersCountsList.push(+orderCountInput.value);
		}));
	}

	public getSizesList(): void {
		let ordersSizesInputs: HTMLCollectionOf<Element>;

		this.ordersSizesList = [];
		ordersSizesInputs = document.getElementsByClassName('cart__order-size');

		Array.from(ordersSizesInputs).forEach(((orderSizesInput: HTMLInputElement) => {
			this.ordersSizesList.push(+orderSizesInput.value);
		}));
	}

	public calcCurrentSum(orders: ICatalogElement[]): void {
		this.ordersCurrentSum = orders
			.reduce(
				(sumOfCurrentsPrices: number, orderEl: ICatalogElement, index: number) =>
					sumOfCurrentsPrices + (orderEl.currentPriceNumber * this.ordersCountsList[index]),
				0);
	}

	public calcBeforeSum(orders: ICatalogElement[]): void {
		this.ordersBeforeSum = orders
			.reduce(
				(sumOfBeforePrices: number, orderEl: ICatalogElement, index: number) => {
					if (orderEl.beforePriceNumber > 0) {
						sumOfBeforePrices += orderEl.beforePriceNumber * this.ordersCountsList[index];
					} else {
						sumOfBeforePrices += orderEl.currentPriceNumber * this.ordersCountsList[index];
					}
					return sumOfBeforePrices;
				},
				0);

		if (this.ordersBeforeSum === this.ordersCurrentSum) {
			this.ordersBeforeSum = 0;
		}
	}

	public calcOrdersSum(): void {
		this.orders$
			.subscribe((ordersState: IOrders) => {
				this.getCoutList();
				this.calcCurrentSum(ordersState.ordersElements);
				this.calcBeforeSum(ordersState.ordersElements);
			})
			.unsubscribe();
	}

	public getDataToSend(): Observable<IOrdersDataToSend> {
		this.dataToSend.userOrders = [];

		this.dataToSend.userName = this.ordersForm.controls['userName'].value;
		this.dataToSend.userTel = this.ordersForm.controls['userPhone'].value;
		this.dataToSend.userAdress = this.ordersForm.controls['userAdress'].value;
		this.dataToSend.beforePrice = this.ordersBeforeSum;
		this.dataToSend.currentPrice = this.ordersCurrentSum;

		this.getCoutList();
		this.getSizesList();

		this.orders$
			.subscribe((ordersState: IOrders) => {
				ordersState.ordersElements.forEach((orderElement: ICatalogElement, index: number) => {
					this.dataToSend.userOrders.push(
						JSON.stringify(new CatalogElement(
							orderElement,
							this.ordersCountsList[index],
							this.ordersSizesList[index]
						))
					);
				});
			})
			.unsubscribe();

		return of(this.dataToSend);
	}

	public sendOrdersRequest(): void {
		this._store.dispatch(new SendData());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void { }
}
