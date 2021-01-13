import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public title: string = 'YourBoots-Shop-App';

	constructor(private _authService: AuthService) { }

	public ngOnInit(): void {
		this._authService.autoAuthUser();
	}
}
