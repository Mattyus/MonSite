import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PhotoComponent } from './photo/photo.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

import { PhotoService } from './services/photo.service';
import { AlbumService } from './services/album.service';



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
    AppRoutingModule,
    FileUploadModule,
    FormsModule
  ],
  providers: [ PhotoService, AlbumService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
