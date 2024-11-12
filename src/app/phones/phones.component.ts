import { Component, OnInit } from '@angular/core';
import { Phone } from '../model/phone.model';
import { PhoneService } from '../phone.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css']
})
export class PhonesComponent implements OnInit {
  phones: Phone[] = []; // Initialize the phones array
  src = "{{produit.imageStr}}"
  constructor(private phoneService : PhoneService,
    public authService: AuthService) { }
  ngOnInit(): void {
    this.chargerPhones(); // Load phones when the component initializes
  }

  chargerPhones(){
    this.phoneService.listePhones().subscribe(prods => {
    this.phones = prods;
    
    this.phones.forEach((prod) => {
    if(prod.images.length!=0){
    prod.imageStr = 'data:' + prod!.images[0]!.type + ';base64,' +
    prod!.images[0]!.image;}
    });
    });
    }

  supprimerPhone(p: Phone) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.phoneService.supprimerPhone(p.id).subscribe(() => {
        console.log("Phone supprimé");
        this.chargerPhones(); // Reload the list after deletion
      });
    }
  }
}
