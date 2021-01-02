import { Component, OnInit } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private _loginGuard: LoginGuard) {
	}

	public ngOnInit(): void {
		// if alredy have permission redirect back (hide login page)
		this._loginGuard.redirectBack();
	}

}
