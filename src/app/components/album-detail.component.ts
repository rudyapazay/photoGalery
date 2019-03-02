import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.service';

import {Album} from '../models/album'
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'albums-detail',
    templateUrl: '../views/album-detail.html',
    providers:[AlbumService]
})

export class AlbumsDetailComponent implements OnInit{
    public titulo:string;
    public album:Album;
    public errorMessage:any;
    public loading: boolean;
 
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _albumService: AlbumService
    ){
        this.titulo='Detalles del album';
    }

    ngOnInit(){
        //console.log("albums-detail.component cargando");
        this.getAlbum();
    }

    getAlbum(){
        this.loading = true;
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];

            this._albumService.getAlbum(id).subscribe(
                result=>{
                    this.album = result.album;
                    if(!this.album){
                        this._router.navigate(['/']);
                    }
                    this.loading=false;   
                },
                error=>{
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        this._router.navigate(['/']);
                    }
                }
            ); 
        });
    }
       
    
}
