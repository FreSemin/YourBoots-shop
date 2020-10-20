import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, concatMap, mergeMap } from 'rxjs/operators';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { SendData, EOrdersFormActions, SendDataSucces, SendDataError } from '../actions/orders-form.actions';
import emailjs from 'emailjs-com';
import { IOrdersDataToSend } from 'src/app/components/models/orders-form/orders-form.model';

@Injectable()
export class OrdersFormEffects {

	@Effect()
	public sendData$: Observable<any> = this._actions$.pipe(
		ofType<SendData>(EOrdersFormActions.SendData),
		switchMap(() => this._catalogService.getDataToSend()),
		concatMap((ordersData: IOrdersDataToSend) => {
		return emailjs.send('service_shop_dev', 'template_getMesTemp', ordersData, 'user_WJ6xuX9CpaHdPQooQh4pA')
				.then(((response: any) => {
					return new SendDataSucces(ordersData);
				}), ((error: any) => {
					return new SendDataError();
				}))
				.finally(() => {
					this._catalogService.ordersForm.reset();
					// return new DataSend();
				});
		}),
		catchError(() => of(new SendDataError()))
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
	) { }
}