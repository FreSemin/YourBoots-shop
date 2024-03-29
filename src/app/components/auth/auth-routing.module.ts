import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: 'login',
				// tslint:disable-next-line: typedef
				loadChildren: () => import('../login/login.module').then(m => m.LoginModule),
			},
			{
				path: 'signup',
				// tslint:disable-next-line: typedef
				loadChildren: () => import('../signup/signup.module').then(m => m.SignupModule),
			}
		],
		canActivateChild: [AuthGuard],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
