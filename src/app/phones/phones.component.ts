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

  constructor(private phoneService : PhoneService,
    public authService: AuthService) { }
  ngOnInit(): void {
    this.chargerPhones(); // Load phones when the component initializes
  }

  chargerPhones() {
    this.phoneService.listePhones().subscribe(prods => {
      console.log(prods);
      this.phones = prods; // Assign the response to the phones array
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
