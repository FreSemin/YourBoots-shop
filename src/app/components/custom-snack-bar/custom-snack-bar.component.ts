import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { ISnackBarData } from '../models/snackBar/snack-bar-data.model';

@Component({
	selector: 'app-custom-snack-bar',
	templateUrl: './custom-snack-bar.component.html',
	styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {

	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarData,
		public modalService: ModalService,
		public authService: AuthService,
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {

		if (this.data === null || this.data === undefined) {
			this.data = {
				text: '',
				isLogin: false,
			};
		}

	}

}
