import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';

@Component({
    selector: 'image-add',
    templateUrl:'../views/image-add.html',
    providers:[ImageService]
})
 
export class ImageAddComponent implements OnInit{
    public titulo:string;
    public btn_titulo:string;
    public image:Image;
    public errorMessage: any;


    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _imageService:ImageService

    ){
        this.titulo="Agregar imagen";
        this.image = new Image("","","");
        this.btn_titulo="Guardar imagen";
    }

    ngOnInit(){
        //console.log("ImageAddComponent");
    }

    onSubmit(){
        this._route.params.forEach((params:Params)=>{
            
            let album_id=params['album'];
            this.image.album = album_id;

            this._imageService.addImage(this.image).subscribe(
                response=>{
                    this.image = response.image;
                    if(!response.image){
                        alert("error en el servidor");
                    }
                    else{
                        //console.log(response.image);
                        this._router.navigate(['/editar-image',response.image._id]);
                    }
                },
                error=>{
                    this.errorMessage = <any> error;
                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                    }
                }
            );
            
        });
    }
}