import { OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { CustomSnackBarComponent } from 'src/app/components/snack-bar/components/custom-snack-bar/custom-snack-bar.component';
import { ISnackBarData } from 'src/app/components/models/snackBar/snack-bar-data.model';
import { OpenMenuStart, CloseMenuStart } from 'src/app/store/actions/menu.actions';
import { selectMenu } from 'src/app/store/selectors/menu.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { tns } from 'tiny-slider/src/tiny-slider';
import { ModalService } from '../modal/modal.service';

@Injectable({
	providedIn: 'root'
})
export class MainAppService implements OnInit, OnDestroy {
	// tslint:disable-next-line: typedef
	public menu$ = this._store.pipe(select(selectMenu));

	public mainSlider: any = null;

	constructor(
		private _snackBar: MatSnackBar,
		private _modalService: ModalService,
		private _store: Store<IAppState>,
	) { }

	public initMainSlider(): void {
		this.mainSlider = tns({
			controls: true,
			nav: false,
			animateNormal: 'tns-fadeIn',
			container: '.slider__slids',
			controlsContainer: '.slider__nav-box',
			navContainer: '.slider__nav-dots-box',
			items: 1,
			slideBy: 1,
			autoplay: true,
			autoplayButtonOutput: false,
			swipeAngle: false,
			speed: 1000,
			autoplayTimeout: 8000,
			responsive: {
				920: {
					nav: true,
				}
			}
		});

		// delete some unused button
		document.querySelectorAll('.tns-liveregion').forEach((item: any) => {
			item.style.display = 'none';
		});
	}

	public destroyMainSlider(): void {
		this.mainSlider = null;
	}

	public setCookiesDuration(): void {
		// tslint:disable-next-line: no-empty
		if (document.cookie !== '') {
		} else {
			document.cookie = 'max-age=1576800';
		}
	}

	public showSuccesMessage(): void {
		this._modalService.isShowSucces = true; // use side service to avoid "Circular dependency"
		this._snackBar.openFromComponent(CustomSnackBarComponent, {
			duration: 5000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	public showErrorMessage(): void {
		this._modalService.isShowSucces = false; // use side service to avoid "Circular dependency"
		this._snackBar.openFromComponent(CustomSnackBarComponent, {
			duration: 5000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	public showDataSuccesMessage(snackBarData: ISnackBarData): void {
		this._modalService.isShowSucces = true;
		this._snackBar.openFromComponent(CustomSnackBarComponent, {
			data: snackBarData,
			duration: 5000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	public showDataErrorMessage(snackBarData: ISnackBarData): void {
		this._modalService.isShowSucces = false;
		this._snackBar.openFromComponent(CustomSnackBarComponent, {
			data: snackBarData,
			duration: 5000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	public showMenu(): void {
		this._store.dispatch(new OpenMenuStart());
	}

	public hideMenu(): void {
		this._store.dispatch(new CloseMenuStart());
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void { }
}
