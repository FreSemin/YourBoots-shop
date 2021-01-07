import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAuthData } from 'src/app/components/models/authData/auth-data.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// tslint:disable-next-line: no-empty
	constructor(
		private _http: HttpClient,
	) { }

	public onAdminLogin(form: NgForm): void {
		console.log(form.value);
	}

	/*
		* Uncommit for creating new admins
		* Exist for create admins accounts
		*	By create hash password
	*/
	public onAdminSingUp(form: NgForm): void {
		if (form.invalid) {
			return;
		}

		const adminAuthData: IAuthData = {
			email: form.value.adminName,
			password: form.value.adminPassword,
			access: 'admin'
		};

		this._http.post(
			'http://localhost:3000/api/auth/admin/signup',
			adminAuthData
		)
			.subscribe((response: any) => {
				form.reset();
			});
	}
}
