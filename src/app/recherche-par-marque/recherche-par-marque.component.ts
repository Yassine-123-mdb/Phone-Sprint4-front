import { Component } from '@angular/core';
import { PhoneService } from '../phone.service';
import { Phone } from '../model/phone.model'; // Import Phone model
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recherche-par-marque',
  templateUrl: './recherche-par-marque.component.html',
  styles: []
})
export class RechercheParMarqueComponent {
  marque!: string; // Declare marque property
  phones!: Phone[]; // Corrected typo and declare phones property
  allPhones! : Phone[];
  searchTerm!: string;

  constructor(private phoneService: PhoneService ,public authService: AuthService) {}
  ngOnInit(): void {
    this.phoneService.listePhones().subscribe(prods => {
    console.log(prods);
    this.allPhones = prods;
    });
    }
    
  rechercherMarks() {
    this.phoneService.rechercherParMarque(this.marque)
      .subscribe(prods => {
        this.phones = prods; // Corrected typo from phons to phones
        console.log(prods);
      });
  }
  supprimerPhone(phone: Phone) {
    const confirmDelete = confirm('Etes-vous sûr de vouloir supprimer ce téléphone ?');
    if (confirmDelete) {
      this.phoneService.supprimerPhone(phone.id).subscribe(() => {
        console.log('Téléphone supprimé');
        this.rechercherMarks(); // Refresh the phone list after deletion
      });
    }
  }
  onKeyUp(filterText : string){
    this.phones = this.allPhones.filter(item =>
    item.marque.toLowerCase().includes(filterText));
    }
    
  
}
