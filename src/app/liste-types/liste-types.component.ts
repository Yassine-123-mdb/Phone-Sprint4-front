import { Component,OnInit } from '@angular/core';
import { Type } from '../model/type.model';
import { PhoneService } from '../phone.service';

@Component({
  selector: 'app-liste-types',
  templateUrl: './liste-types.component.html',
  styles: ``
})
export class ListeTypesComponent implements OnInit {
  type! : Type[];
  updatedTyp:Type = {"idType":0,"nomType":"","descriptionType":""};
  ajout :boolean=true;
  constructor(private phoneService : PhoneService) { }
  ngOnInit(): void {
  this.phoneService.listeTypes().
  subscribe(typs => {this.type = typs._embedded.types;
  console.log(typs);
  });
  }
  
  typeUpdated(typ:Type){
    console.log("typ updated event",typ);
    this.phoneService.ajouterType(typ).
     subscribe( ()=> this.chargerTypes());
  }
  chargerTypes(){
    this.phoneService.listeTypes().
    subscribe(typs => {this.type = typs._embedded.types;
    console.log(typs)});
  }
  updatedtyp(typ:Type) {
    this.updatedTyp=typ;
    this.ajout=false;
    }
  
}
