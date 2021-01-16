import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
		path: 'authorization',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'admin',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
		canActivate: [AuthGuard],
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
