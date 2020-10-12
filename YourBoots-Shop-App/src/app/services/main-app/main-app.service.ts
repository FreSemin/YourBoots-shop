import { OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { tns } from 'tiny-slider/src/tiny-slider';

@Injectable({
	providedIn: 'root'
})
export class MainAppService implements OnInit, OnDestroy {
	public mainSlider: any = null;

	// tslint:disable-next-line: no-empty
	constructor() { }

	public initMainSlider(): void {
		this.mainSlider = tns({
			container: '.slider__slids',
			controls: true,
			controlsContainer: '.slider__nav-box',
			navContainer: '.slider__nav-dots-box',
			items: 1,
			slideBy: 1,
			autoplay: true,
			animateNormal: 'tns-fadeIn',
			autoplayButtonOutput: false,
			nav: true,
			mouseDrag: true,
			swipeAngle: false,
			speed: 1000,
		});

		// delete some unused button
		document.querySelectorAll('.tns-liveregion').forEach((item: any) => {
			item.style.display = 'none';
		});
	}

	public destroyMainSlider(): void {
		this.mainSlider = null;
	}

	// tslint:disable-next-line: no-empty
	public ngOnInit(): void { }

	// tslint:disable-next-line: no-empty
	public ngOnDestroy(): void { }
}
