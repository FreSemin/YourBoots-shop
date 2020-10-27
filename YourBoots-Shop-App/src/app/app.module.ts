import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CatalogEffects } from './store/effects/catalog.effects';
import { CatalogService } from './services/catalog/catalog.service';
import { MainAppService } from './services/main-app/main-app.service';
import { HttpClientModule } from '@angular/common/http';
import { CatalogCardComponent } from './components/catalog-card/catalog-card.component';
import { OrdersEffects } from './store/effects/orders.effects';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrdersFormEffects } from './store/effects/orders-form.effects';
import { LoaderComponent } from './components/loader/loader.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';
import { ContactModalEffects } from './store/effects/contact-modal.effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-modules/meterial.module';

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		HomeComponent,
		CartComponent,
		SliderComponent,
		CatalogCardComponent,
		OrderCardComponent,
		LoaderComponent,
		ContactModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([CatalogEffects, OrdersEffects, OrdersFormEffects, ContactModalEffects]),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		NoopAnimationsModule,
	],
	providers: [MainAppService, CatalogService],
	bootstrap: [AppComponent]
})
export class AppModule { }
