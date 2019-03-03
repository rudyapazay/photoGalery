import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from '@angular/router';


import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector:"image-detail",
    templateUrl:'../views/image-detail.html',
    providers:[ImageService]
})

export class ImageDetailComponent implements OnInit{
    
    public titulo:string;
    public api_url:string;
    public image:Image;
    public loading: boolean;
    public errorMessage: any;
    public confirmado: any;

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _imageService:ImageService
    ){
        this.titulo="detalles de la imagen";
    }

    ngOnInit(){
        console.log("ImageDetailComponent");
        this.api_url =this._imageService.getApiUrl('get-image/');
        this.getImage();
    }

    getImage(){
        this.loading =true;
        this._route.params.forEach((paramas:Params)=>{
            let id=paramas['id'];

            this._imageService.getImage(id).subscribe(
                result=>{
                    this.image = result.image;
                    if(!this.image){
                        this._router.navigate(['/']);
                    }
                    
                },
                error=>{
                    this.errorMessage = <any>error;
                    
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                    }
                }
            );

            this.loading=false;
        });
        
    }
    
    onDeleteConfirm(id){
        this.confirmado =id;
    }

    onCancelImage(){
        this.confirmado= null;
    }

    onDeleteImage(id){
        this._imageService.deleteImage(id).subscribe(
            result=>{
                if(!result.image){
                    alert('Error en el servidor')
                }
                this._router.navigate(['/album', result.image.album]);
            },
            error=>{
                this.errorMessage =<any>error;
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                }
            }
        );
    }
}