import { Component,OnInit } from '@angular/core';
import { PhoneService } from '../phone.service';
import { Phone } from '../model/phone.model';
import { Image } from '../model/image.model';
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
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;


  updatedTypId ?: number;
  constructor(private activatedRoute: ActivatedRoute,
  private router :Router,
  private phoneService: PhoneService) { }
  ngOnInit(): void {
    this.phoneService.listeTypes().
    subscribe(cats => {this.types = cats._embedded.types;
      console.log(cats);
      });
      
      this.phoneService.consulterPhone(this.activatedRoute.snapshot.params['id']).
      subscribe(  prod =>{ this.currentPhone = prod;
        this.updatedTypId = prod.type?.idType;
        } ) ;
        }
        
        onImageUpload(event: any) {
          if(event.target.files && event.target.files.length) {
          this.uploadedImage = event.target.files[0];
          this.isImageUpdated =true;
          const reader = new FileReader();
          reader.readAsDataURL(this.uploadedImage);
          reader.onload = () => { this.myImage = reader.result as string; };
          }
        }
        onAddImagePhone(){
          this.phoneService
          .uploadImagePhon(this.uploadedImage,this.uploadedImage.name,this.currentPhone.id)
              .subscribe( (img : Image) => {
                    this.currentPhone.images.push(img);
                 });
        }
        supprimerImage(img: Image) {
          let conf = confirm("Etes-vous sûr ?");
          if (conf)
            this.phoneService.supprimerImage(img.idImage).subscribe(() => {
              //supprimer image du tableau currentPhone.images 
              const index = this.currentPhone.images.indexOf(img, 0);
              if (index > -1) {
                this.currentPhone.images.splice(index, 1);
              }
            });}
            
            updatePhone() {
              this.currentPhone.type = this.types.find(typ => typ.idType == this.updatedTypId)!;
              if (this.isImageUpdated) {
                this.onAddImagePhone();
              }
              this.phoneService.updatePhone(this.currentPhone).subscribe(() => {
                this.router.navigate(['phones']);
              });
            }
      
}