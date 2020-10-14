import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { SliderComponent } from './components/slider/slider.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material-modules/meterial.module';

@NgModule({
	declarations: [
		AppComponent,
		MenuComponent,
		HomeComponent,
		CartComponent,
		SliderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NoopAnimationsModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
