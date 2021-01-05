import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// tslint:disable-next-line: no-empty
	constructor() { }

	public onAdminLogin(form: NgForm): void {
		console.log(form.value);
	}
}
