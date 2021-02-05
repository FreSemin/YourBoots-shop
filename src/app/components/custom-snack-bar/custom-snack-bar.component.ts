import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
// import { AuthService } from 'src/app/services/auth/auth.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
	selector: 'app-custom-snack-bar',
	templateUrl: './custom-snack-bar.component.html',
	styleUrls: ['./custom-snack-bar.component.scss']
})
export class CustomSnackBarComponent implements OnInit {

	constructor(
		@Inject(MAT_SNACK_BAR_DATA) public data: string,
		public modalService: ModalService,
		// public authService: AuthService,
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
