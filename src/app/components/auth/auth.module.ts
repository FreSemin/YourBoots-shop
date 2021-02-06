import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupModule } from '../signup/signup.module';
import { LoginModule } from '../login/login.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
	declarations: [
		AuthComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		SignupModule,
		LoginModule,
		SharedModule,
	]
})
export class AuthModule { }
