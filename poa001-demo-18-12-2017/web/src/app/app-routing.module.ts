import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RequestComponent } from './request/request.component';
import { ProvideComponent } from './provide/provide.component';

const routes: Routes = [
    { path: 'request', component: RequestComponent },
    { path: 'provide', component: ProvideComponent },
    { path: '', redirectTo: '/request', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
