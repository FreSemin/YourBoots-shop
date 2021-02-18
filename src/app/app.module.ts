import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CatalogEffects } from './store/effects/catalog.effects';
import { CatalogService } from './services/catalog/catalog.service';
import { MainAppService } from './services/main-app/main-app.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersEffects } from './store/effects/orders.effects';
import { OrdersFormEffects } from './store/effects/orders-form.effects';
import { ContactModalEffects } from './store/effects/contact-modal.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-modules/meterial.module';
import { MenuEffects } from './store/effects/menu.effects';
import { HomeModule } from './components/home/home.module';
import { ModalService } from './services/modal/modal.service';
import { CardFormService } from './services/card-form/card-form.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthModule } from './components/auth/auth.module';
import { AuthEffects } from './store/effects/auth.effects';
import { ErrorInterceptor } from './error.interceptor';
import { SnackBarModule } from './components/snack-bar/snack-bar.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
		HomeModule,
		AuthModule,
		SnackBarModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([
			CatalogEffects,
			OrdersEffects,
			OrdersFormEffects,
			ContactModalEffects,
			MenuEffects,
			AuthEffects,
		]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
	],
	providers: [
		MainAppService,
		CatalogService,
		ModalService,
		CardFormService,
		AuthService,
		AuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
