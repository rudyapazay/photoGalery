
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ImageService } from '../services/image.service';
import { Image } from '../models/image';
import { XHRConnection } from '@angular/http';
import { GLOBAL } from '../services/global';

@Component({
    selector:'image-edit',
    templateUrl:'../views/image-add.html',
    providers:[ImageService]
})

export class ImageEditComponent implements OnInit{
    public titulo:string;
    public btn_titulo:string;
    public image:Image;
    public errorMessage:any;
    public is_edit:boolean;

    constructor(
        private _route:ActivatedRoute,
        private _router:Router,
        private _imageService:ImageService
    ){
        this.btn_titulo="Guardar cambios",
        this.titulo="Editar imagen"
        this.is_edit=true;
        this.image = new Image("","","");
    }
    ngOnInit(){
        //console.log("ImageEditComponent")
        this.getImage();
    }

    getImage(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];
            this._imageService.getImage(id).subscribe(
                response=>{
                    this.image = response.image;
                    if(!response.image){
                        alert('Error en el servidor');
                        this._router.navigate(['/'])
                    }
                    else{
                        //this._router.navigate(['/']);
                    }
                },
                error=>{
                    this.errorMessage =<any>error;
                    if(!this.errorMessage!=null){
                        console.log(this.errorMessage);
                    }
                }
            );
        });
    }
    
    onSubmit(){
        this._route.params.forEach((params:Params)=>{
            let id = params['id'];

            this._imageService.editImage(id,this.image).subscribe(
                response=>{
                    this.image = response.image;
                    if(!response.image){
                        alert('Error en el servidor');
                    }
                    else{   
                        //subir la imagen
                        if(!this.filesToUpload){
                            this._router.navigate(['/album',this.image.album]);
                        }
                        else{
                            this.makeFileRequest(GLOBAL.url+'upload-image/'+id,[],this.filesToUpload)
                                .then(
                                    result=>{
                                        this.resultUpload=result;
                                        this.image.picture = this.resultUpload.filename;
                                        this._router.navigate(['/album',this.image.album]);
                                    },
                                    error=>{
                                        console.log(error);
                                    }
                            );
                        }
                    }
                },
                error=>{
                    this.errorMessage =<any>error;
                    if(!this.errorMessage!=null){
                        console.log(this.errorMessage);
                    }
                }
            );
        });
    }
    
    public filesToUpload: Array<File>;
    public resultUpload;

    fileChangeEvent(fileInput:any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    makeFileRequest(url:string, params:Array<string>, files:Array<File>){
        return new Promise((resolve,reject)=>{
            var formData:any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i=0; i<files.length; i++){
                formData.append('image',files[i],files[i].name);
            }

            xhr.onreadystatechange = ()=>{
                if(xhr.readyState == 4){
                    if(xhr.status==200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else{
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST',url,true);
            xhr.send(formData);
        });
    }

}
