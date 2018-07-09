import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { RequestComponent } from './request/request.component';
import { ProvideComponent } from './provide/provide.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './user.service';
import { ArtifactService } from './artifact.service';


@NgModule({
  declarations: [
    AppComponent,
    RequestComponent,
    ProvideComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService, ArtifactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
