import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { CatalogService } from 'src/app/services/catalog/catalog.service';
import { ECatalogActions, CatalogGetElementsSucces, CatalogGetElementsError, CatalogGetElements } from '../actions/catalog.actions';
import { catchError, switchMap } from 'rxjs/operators';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';

@Injectable()
export class CatalogEffects {

	@Effect()
	public getCatalogElements$: Observable<any> = this._actions$.pipe(
		ofType<CatalogGetElements>(ECatalogActions.GetElements),
		switchMap(() => this._catalogService.getCatalogElements()),
		switchMap((catalog: ICatalog) => {
			return of(new CatalogGetElementsSucces(catalog.catalogElements));
		}),
		catchError((err: any) => {
			console.log(err);
			return of(new CatalogGetElementsError());
		})
	);

	constructor(
		private _actions$: Actions,
		private _catalogService: CatalogService,
	) { }
}
