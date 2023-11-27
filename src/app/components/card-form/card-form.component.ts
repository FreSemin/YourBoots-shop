import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardFormService } from 'src/app/services/card-form/card-form.service';
import { EUserPermission } from 'src/app/components/models/authTokenData/authTokenData.model';

@Component({
	selector: 'app-card-form',
	templateUrl: './card-form.component.html',
	styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
	public updateElementId: string = '';

	public catalogAddElementForm: FormGroup = this.cardFormService.catalogAddElementForm;

	public userPermission: string = this.authService.getUserPermission();
	public adminPermission: string = EUserPermission.admin;

	constructor(
		private _activatedRoute: ActivatedRoute,
		public cardFormService: CardFormService,
		public authService: AuthService,
	) { }

	public pickImg(event: Event): void {
		this.cardFormService.onPickImg(event);
	}

	public ngOnInit(): void {
		// Haven't information about router in cardFormService
		this.updateElementId = this._activatedRoute.snapshot.params['cardId'];

		this.cardFormService.openForm(this.updateElementId);
	}

}
