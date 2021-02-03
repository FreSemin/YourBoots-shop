import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IAuthState } from '../models/auth/auth-state.model';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
	private _authStateListener: Subscription;

	public isAuthenticated: boolean = false;
	public userEmail: string = '';

	constructor(
		public authService: AuthService
	) { }

	public ngOnInit(): void {
		this._authStateListener = this.authService.auth$
			.subscribe((state: IAuthState) => {
				this.isAuthenticated = state.isAuthenticated;
				this.userEmail = state.userEmail;
			});
	}

	public ngOnDestroy(): void {
		this._authStateListener.unsubscribe();
	}

}
