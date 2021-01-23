import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	public isAuthenticated: boolean = false;
	public userEmail: string = '';

	constructor(
		public authService: AuthService
	) { }

	public ngOnInit(): void {
		this.isAuthenticated = this.authService.getIsAuth();
		this.userEmail = this.authService.getUserEmail();
	}

}
