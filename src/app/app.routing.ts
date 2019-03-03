import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsListComponent } from './components/albums-list.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumsDetailComponent } from './components/album-detail.component';
import { AlbumsEditComponent } from './components/album-edit.component';
import { ImageAddComponent } from './components/image-add.component';
import { ImageEditComponent } from './components/image-edit.component';
import { ImageDetailComponent } from './components/image-detail.component';

const appRoutes:Routes = [
    {path:'', component:AlbumsListComponent},
    {path:'crear-album', component:AlbumAddComponent},
    {path:'album/:id', component:AlbumsDetailComponent},
    {path:'edit-album/:id',component:AlbumsEditComponent},
    {path:'crear-image/:album',component:ImageAddComponent},
    {path:'editar-image/:id',component:ImageEditComponent},
    {path:'image/:id',component:ImageDetailComponent},
    {path:'**', component:AlbumsListComponent}
];

export const appRoutingProviders: any[] =[];

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);