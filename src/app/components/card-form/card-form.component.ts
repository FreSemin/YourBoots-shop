import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardFormService } from 'src/app/services/card-form/card-form.service';

@Component({
	selector: 'app-card-form',
	templateUrl: './card-form.component.html',
	styleUrls: ['./card-form.component.scss']
})
export class CardFormComponent implements OnInit {
	public catalogAddElementForm: FormGroup = this.cardFormService.catalogAddElementForm;

	constructor(
		public cardFormService: CardFormService,
		private _activatedRoute: ActivatedRoute,
	) { }

	public ngOnInit(): void {
		// Haven't information about router in cardFormService
		const elementId: string = this._activatedRoute.snapshot.params['cardId'];

		this.cardFormService.openForm(elementId);
	}

}
