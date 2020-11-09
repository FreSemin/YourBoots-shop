import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
	selector: 'app-custom-snack-bar',
	templateUrl: './custom-snack-bar.component.html',
	styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {

	constructor(
		public modalService: ModalService,
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
