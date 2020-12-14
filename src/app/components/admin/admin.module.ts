import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AdminComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class AdminModule { }
