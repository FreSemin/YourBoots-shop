import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardFormComponent } from '../card-form/card-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [
		AdminComponent,
		CardFormComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule
	],
})
export class AdminModule { }
