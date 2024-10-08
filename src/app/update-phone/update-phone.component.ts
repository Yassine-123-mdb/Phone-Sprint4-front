import { Component,OnInit } from '@angular/core';
import { PhoneService } from '../phone.service';
import { Phone } from '../model/phone.model';
import { ActivatedRoute,Router } from '@angular/router';
import { Type } from '../model/type.model';
@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styles: ``
})
export class UpdatePhoneComponent implements OnInit {
  currentPhone = new Phone();
  types! : Type[];
  updatedTypId ?: number;
  constructor(private activatedRoute: ActivatedRoute,
  private router :Router,
  private phoneService: PhoneService) { }
  ngOnInit(): void {
    this.phoneService.listeTypes().
    subscribe(cats => {console.log(cats);
    this.types = cats._embedded.types;
    }
    );
    this.phoneService.consulterPhone(this.activatedRoute.snapshot.params['id']).
    subscribe( prod =>{ this.currentPhone = prod;
    this.updatedTypId = this.currentPhone.type?.idType;
    } ) ;
    }
  
    updatePhone() {
      this.currentPhone.type = this.types.find(typ => typ.idType == this.updatedTypId)!;
      this.phoneService.updatePhone(this.currentPhone).subscribe(phon => {
      this.router.navigate(['phones']); }
      );
      }
      
}