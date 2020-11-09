import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, concatMap } from 'rxjs/operators';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { SendData, EOrdersFormActions, SendDataSucces, SendDataError } from '../actions/orders-form.actions';
import emailjs from 'emailjs-com';
import { IOrdersDataToSend } from 'src/app/components/models/orders-form/orders-form.model';
import { environment } from 'src/environments/environment';
import { MainAppService } from 'src/app/services/main-app/main-app.service';

@Injectable()
export class OrdersFormEffects {

	@Effect()
	public sendData$: Observable<any> = this._actions$.pipe(
		ofType<SendData>(EOrdersFormActions.SendData),
		switchMap(() => this._catalogService.getDataToSend()),
		concatMap((ordersData: IOrdersDataToSend) => {
			return emailjs.send(environment.emailjsServiceID, environment.emailjsTemplateID, ordersData, environment.emailjsUserID)
				.then(((response: any) => {
					this._mainAppService.showSuccesMessage();
					return new SendDataSucces(ordersData);
				}), ((error: any) => {
					this._mainAppService.showErrorMessage();
					return new SendDataError();
				}))
				.finally(() => {
					this._catalogService.ordersForm.reset();
					this._catalogService.clearOrders();
				});
		}),
		catchError(() => {
			this._mainAppService.showErrorMessage();
			return of(new SendDataError());
		})
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
		private _mainAppService: MainAppService,
	) { }
}
