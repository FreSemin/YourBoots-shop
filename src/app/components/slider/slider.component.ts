import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainAppService } from 'src/app/services/main-app/main-app.service';
import { environment } from 'src/environments/environment';
// import { tns } from 'tiny-slider/src/tiny-slider';

@Component({
	selector: 'app-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
	public sliderImgsSlider: string = environment.imgsUrl;

	constructor(private _mainService: MainAppService) { }

	public ngOnInit(): void {
		this._mainService.initMainSlider();
	}

	public ngOnDestroy(): void {
		this._mainService.destroyMainSlider();
	}
}
