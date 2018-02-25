import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule, NgbDatepickerI18n, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PhotoComponent } from './photo/photo.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

import { PhotoService } from './services/photo.service';
import { AlbumService } from './services/album.service';
import { I18nService } from './datepicker/i18n.service';
import { CustomDatepickerI18n } from './datepicker/customdatepickeri18n.service';
import { NgbDateFRParserFormatter } from './datepicker/ngbdatefrparserformatter.service';
import { NgbDateNativeAdapter } from './datepicker/ngbdatenativeadapter.service';

TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Ajouter un nouveau tag',
      secondaryPlaceholder: 'Entrer un tag',
      // add here other default values for tag-input
  },
  dropdown: {
      displayBy: 'my-display-value',
      // add here other default values for tag-input-dropdown
  }
});

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
    FormsModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [ PhotoService, AlbumService, I18nService,
    {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
    {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
    {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
