import { Component, OnInit } from '@angular/core';
import { Phone } from '../model/phone.model';
import { PhoneService } from '../phone.service';
import { Image } from '../model/image.model';
import { Type } from '../model/type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.component.html',
  styleUrls: ['./add-phone.component.css']
})
export class AddPhoneComponent implements OnInit {
  types!: Type[];
  newIdTyp!: number;
  newType!: Type;
  newPhone = new Phone();
  uploadedImage!: File;
  imagePath: any;

  constructor(private phoneService: PhoneService, private router: Router) {}

  ngOnInit(): void {
    this.phoneService.listeTypes().subscribe((typs) => {
      this.types = typs._embedded.types;
    });
  }

  addPhone() {
    // First, create the phone without the image
    this.newPhone.type = this.types.find(type => type.idType === this.newIdTyp)!;
  
    this.phoneService.ajouterPhone(this.newPhone).subscribe((createdPhone: Phone) => {
      // After the phone is created, upload the image associated with the phone ID
      this.phoneService.uploadImagePhon(this.uploadedImage, this.uploadedImage.name, createdPhone.id)
        .subscribe(() => {
          this.router.navigate(['phones']);
        });
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.imagePath = reader.result; }
  }
}
