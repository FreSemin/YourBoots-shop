import { OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { tns } from 'tiny-slider/src/tiny-slider';
import { ModalService } from '../modal/modal.service';

@Injectable({
	providedIn: 'root'
})
export class MainAppService implements OnInit, OnDestroy {
	public mainSlider: any = null;

	constructor(
		private _snackBar: MatSnackBar,
		private _modalService: ModalService,
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

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void { }
}
