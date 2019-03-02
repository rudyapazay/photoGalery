import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.service';

import {Album} from '../models/album'

@Component({
    selector: 'albums-edit',
    templateUrl: '../views/album-add.html',
    providers:[AlbumService]
})

export class AlbumsEditComponent implements OnInit{
    public titulo:string;
    public album:Album;
    public errorMessage:any;
    public loading: boolean;
    public buttomtitulo:string;

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _albumService: AlbumService
    ){
        this.titulo='Modificando el album';
        this.buttomtitulo="Guardar Cambios";
    }

    ngOnInit(){
        //console.log("albums-detail.component cargando");
        this.album = new Album("","");
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
                        //console.log(this.errorMessage);
                        this._router.navigate(['/']);
                    }
                }
            ); 
        });
    }

    onSubmit(){
        this._route.params.forEach((params:Params)=>{
            let id=params['id'];

            this._albumService.editAlbum(id,this.album).subscribe(
                result=>{
                    this.album = result.album;
                    if(!result.album){
                        alert('Error en el servidor');
                    }
                    else{
                        this._router.navigate(['album/'+id]);
                    }
                },
                error=>{
                    this.errorMessage = <any>error;
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                    }
                }
            );
        });
    }
    
    
    
}
