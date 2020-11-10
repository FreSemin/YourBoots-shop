import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CatalogCardComponent } from '../catalog-card/catalog-card.component';
import { SliderComponent } from '../slider/slider.component';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		HomeComponent,
		SliderComponent,
		CatalogCardComponent,
		ContactModalComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class HomeModule { }
