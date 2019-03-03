import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {AlbumService} from '../services/album.service';

import {Album} from '../models/album'
import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'albums-detail',
    templateUrl: '../views/album-detail.html',
    providers:[
        AlbumService,
        ImageService
    ]
})

export class AlbumsDetailComponent implements OnInit{
    public titulo:string;
    public album:Album;
    public images:Image[];
    public errorMessage:any;
    public loading: boolean; 
    public api_url:string  
    confirmado: any;
    
    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _albumService: AlbumService,
        private _imageService:ImageService
        ){
            this.titulo='Detalles del album';
        }
        
        ngOnInit(){
            //console.log("albums-detail.component cargando");
            this.api_url =this._imageService.getApiUrl('get-image/');
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
                    else{
                        //  llamada al metodo del servicio de imagenes
                        this._imageService.getImages(result.album._id).subscribe(
                            response=>{
                                this.images = response.images;
                                if(!this.images.length){
                                    console.log('Sin imagenes');
                                }
                                else{
                                    //console.log(this.images);
                                }
                                
                            },
                            error=>{
                                this.errorMessage = <any>error;
                                if(this.errorMessage != null){
                                    console.log(this.errorMessage);
                                    this._router.navigate(['/']);
                                }
                            }
                        );
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
