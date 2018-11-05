import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

import { PhotoComponent } from './photo/photo.component';
import { AcceuilComponent } from './acceuil/acceuil.component';

const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  { path: 'acceuil', component: AcceuilComponent },
  { path: 'photo/:album', component: PhotoComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
