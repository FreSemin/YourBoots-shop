import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISnackBarData } from './components/models/snackBar/snack-bar-data.model';
import { MainAppService } from './services/main-app/main-app.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private mainAppService: MainAppService) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					const snackBarData: ISnackBarData = {
						text: 'Error, something goes wrong, try later',
						isLogin: false,
					};

					this.mainAppService.showDataErrorMessage(snackBarData);
					return throwError(error);
				})
			);
	}

}
