import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardFormService } from 'src/app/services/card-form/card-form.service';

@Component({
	selector: 'app-card-form',
	templateUrl: './card-form.component.html',
	styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
	public updateElementId: string = '';

	public catalogAddElementForm: FormGroup = this.cardFormService.catalogAddElementForm;

	constructor(
		public cardFormService: CardFormService,
		private _activatedRoute: ActivatedRoute,
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
