import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private _authService: AuthService) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authToken: string = this._authService.getToken();
		const authRequest: HttpRequest<any> = req.clone({
			headers: req.headers.set('Authorization', 'Bearer ' + authToken),
		});
		return next.handle(authRequest);
	}
}
