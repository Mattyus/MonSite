import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotoComponent } from './photo/photo.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'photo/:album', component: PhotoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
