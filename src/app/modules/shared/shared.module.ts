import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogCardComponent } from 'src/app/components/catalog-card/catalog-card.component';
import { ContactModalComponent } from 'src/app/components/contact-modal/contact-modal.component';
import { SliderComponent } from 'src/app/components/slider/slider.component';
import { OrderCardComponent } from 'src/app/components/order-card/order-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SliderComponent,
		CatalogCardComponent,
		ContactModalComponent,
		OrderCardComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	exports: [
		SliderComponent,
		CatalogCardComponent,
		ContactModalComponent,
		OrderCardComponent,
	]
})
export class SharedModule { }
