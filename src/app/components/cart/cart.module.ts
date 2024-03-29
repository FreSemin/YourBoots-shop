import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
	declarations: [
		CartComponent,
	],
	imports: [
		CommonModule,
		CartRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class CartModule { }
