import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IContactModalDataToSend } from 'src/app/components/models/contact-modal/contact-modal.model';
import { OnActive, OnClose, OnSendData } from 'src/app/store/actions/contact-modal.actions';
import { selectContactModal } from 'src/app/store/selectors/contact-modal.selector';
import { IAppState } from 'src/app/store/states/app.state';

@Injectable({
	providedIn: 'root'
})
export class ModalService implements OnInit {
	public isShowSucces: boolean;

	// tslint:disable-next-line: typedef
	public contactModal$ = this._store.pipe(select(selectContactModal));

	public dataToSend: IContactModalDataToSend = {
		userName: '',
		userTel: '',
	};

	public contactModalForm: FormGroup = new FormGroup({
		userName: new FormControl('', Validators.required),
		userPhone: new FormControl('', Validators.pattern('[0-9(/\+ -/)]{1,}')),
	});

	// tslint:disable-next-line: no-empty
	constructor(
		private _store: Store<IAppState>
	) { }

	public getDataToSend(): Observable<IContactModalDataToSend> {
		this.dataToSend.userName = this.contactModalForm.controls['userName'].value;
		this.dataToSend.userTel = this.contactModalForm.controls['userPhone'].value;

		return of(this.dataToSend);
	}

	public openContactModal(): void {
		document.body.style.overflow = 'hidden'; // disable page scroll
		this._store.dispatch(new OnActive());
	}

	public closeContacatModal(): void {
		document.body.style.overflow = 'auto'; // active page scroll
		this._store.dispatch(new OnClose());
	}

	public sendContactRequest(): void {
		this._store.dispatch(new OnSendData());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }
}
