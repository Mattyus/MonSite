import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PhotoComponent } from './photo/photo.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
