import { Component } from '@angular/core';
import { Phone } from '../model/phone.model';
import { PhoneService } from '../phone.service';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrl: './add-phone.component.css'
})
export class AddPhoneComponent {
  types! : Type[];
  newIdTyp! : number;
  newType! : Type;
  newPhone = new Phone();
  constructor(private phoneService: PhoneService,
  private router :Router) { }
  ngOnInit(): void {
    this.phoneService.listeTypes().
    subscribe(typs => {console.log(typs);
      this.types = typs._embedded.types;});
    };
    
    
    addPhones(){
      this.newPhone.type = this.types.find(typ => typ.idType == this.newIdTyp)!;
      this.phoneService.ajouterPhone(this.newPhone)
      .subscribe(prod => {
      console.log(prod);
      this.router.navigate(['phones']);
      });
      }
      
    
  }

