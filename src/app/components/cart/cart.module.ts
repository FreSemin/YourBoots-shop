import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { OrderCardComponent } from '../order-card/order-card.component';

@NgModule({
	declarations: [
		CartComponent,
		OrderCardComponent,
	],
	imports: [
		CommonModule,
		CartRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class CartModule { }
