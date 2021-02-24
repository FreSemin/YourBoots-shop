import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(
		public authService: AuthService
	) {
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void {
	}

}
