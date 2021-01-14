import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	constructor(
		public authService: AuthService
	) { }

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
