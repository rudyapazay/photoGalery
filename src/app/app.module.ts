import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }  from '@angular/http';

import { AppComponent } from './app.component';
import {  AlbumsListComponent} from './components/albums-list.component';

import { routing, appRoutingProviders } from './app.routing';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumsDetailComponent } from './components/album-detail.component';
import { AlbumsEditComponent } from './components/album-edit.component';
import { ImageAddComponent } from './components/image-add.component';
import { ImageEditComponent } from './components/image-edit.component';
import { ImageDetailComponent } from './components/image-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumAddComponent,
    AlbumsDetailComponent,
    AlbumsEditComponent,
    ImageAddComponent,
    ImageEditComponent,
    ImageDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing

  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
