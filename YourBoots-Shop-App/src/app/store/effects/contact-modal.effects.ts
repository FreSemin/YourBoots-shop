import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, concatMap, mergeMap, tap } from 'rxjs/operators';
import emailjs from 'emailjs-com';
import { environment } from 'src/environments/environment';
import { ModalService } from 'src/app/services/modal/modal.service';
import { IContactModalDataToSend } from 'src/app/components/models/contact-modal/contact-modal.model';
import { EContactModalActions, OnSendData, OnSendDataError, OnSendDataSucces } from '../actions/contact-modal.actions';

@Injectable()
export class ContactModalEffects {

	@Effect()
	public sendData$: Observable<any> = this._actions$.pipe(
		ofType<OnSendData>(EContactModalActions.OnSendData),
		switchMap(() => this._modalService.getDataToSend()),
		concatMap((contactData: IContactModalDataToSend) => {
			return emailjs.send(environment.emailjsServiceID, environment.emailjsRecallTemplateID, contactData, environment.emailjsUserID)
				.then(((response: any) => {
					return new OnSendDataSucces(contactData);
				}), ((error: any) => {
					return new OnSendDataError();
				}))
				.finally(() => {
					this._modalService.closeContacatModal();
				});
		}),
		catchError(() => of(new OnSendDataError()))
	);

	constructor(
		private _actions$: Actions,
		private _modalService: ModalService,
	) { }
}
