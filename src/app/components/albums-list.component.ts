import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'albums-list',
    templateUrl: '../views/albums-list.html'
})

export class AlbumsListComponet implements OnInit{
    public titulo:string;
    

    ngOnInit(){
        this.titulo='Listado de albunes';
        console.log("albums-list.component");
    }
}