import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICatalogElement } from 'src/app/components/models/catalogElement/catalog-element.model';
import { IAppState } from 'src/app/store/states/app.state';
import { select, Store } from '@ngrx/store';
import { CatalogGetElements } from 'src/app/store/actions/catalog.actions';
import { selectCatalog } from 'src/app/store/selectors/catalog.selectors';
import { Observable } from 'rxjs/internal/Observable';
import { ICatalog } from 'src/app/components/models/catalog/catalog.model';

@Injectable({
	providedIn: 'root'
})
export class CatalogService implements OnInit, OnDestroy {
	// tslint:disable-next-line: typedef
	public catalog$ = this._store.pipe(select(selectCatalog));

	constructor(
		private _http: HttpClient,
		private _store: Store<IAppState>
	) { }

	public loadCatalog(): void {
		this._store.dispatch(new CatalogGetElements());
	}

	public getCatalogElements(): Observable<ICatalog> {
		return this._http.get<ICatalog>(
			`../../../assets/json/catalog.json`
		);
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void { }
}
