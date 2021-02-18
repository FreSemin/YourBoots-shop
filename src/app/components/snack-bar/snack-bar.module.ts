import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomOrderSnackBarComponent } from './components/custom-order-snack-bar/custom-order-snack-bar.component';
import { CustomSnackBarComponent } from './components/custom-snack-bar/custom-snack-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		CustomSnackBarComponent,
		CustomOrderSnackBarComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
	],
})
export class SnackBarModule { }
