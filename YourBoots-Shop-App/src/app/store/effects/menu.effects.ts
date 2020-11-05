import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { OpenMenuStart, OpenMenuEnd, EMenuActions, CloseMenuEnd, CloseMenuStart } from '../actions/menu.actions';

@Injectable()
export class MenuEffects {

	@Effect()
	public openMenu$: Observable<any> = this._actions$.pipe(
		ofType<OpenMenuStart>(EMenuActions.OpenMenuStart),
		mergeMap(() => {
			document.body.style.overflow = 'hidden';
			return of(new OpenMenuEnd());
		}),
	);

	@Effect()
	public closeMenu$: Observable<any> = this._actions$.pipe(
		ofType<CloseMenuStart>(EMenuActions.CloseMenuStart),
		// tslint:disable-next-line: no-magic-numbers
		delay(1000),
		mergeMap(() => {
			document.body.style.overflow = 'auto';
			return of(new CloseMenuEnd());
		}),
	);

	constructor(
		private _actions$: Actions,
	) { }
}
