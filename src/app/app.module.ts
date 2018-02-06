import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PhotoComponent } from './photo/photo.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

import { PhotoService } from './services/photo.service';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PhotoComponent,
    AcceuilComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ PhotoService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
