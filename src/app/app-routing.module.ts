import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
	{
		path: '',
		// tslint:disable-next-line: typedef
		loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
	},
	{
		path: 'cart',
		component: CartComponent
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
