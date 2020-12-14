import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'cart',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/cart/cart.module').then(m => m.CartModule)
	},
	{
		path: 'admin',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
