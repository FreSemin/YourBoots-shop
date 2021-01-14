import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

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
		path: 'auth',
		loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'admin',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule),
		canActivate: [LoginGuard],
	},
	{
		path: 'login',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
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
