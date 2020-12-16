import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardFormComponent } from '../card-form/card-form.component';

import { AdminComponent } from './admin.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'add',
				component: CardFormComponent,
			},
			{
				path: 'edit/:cardId',
				component: CardFormComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
