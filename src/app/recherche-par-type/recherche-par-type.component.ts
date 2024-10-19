import { Component, OnInit } from '@angular/core';
import { Phone } from '../model/phone.model';
import { Type } from '../model/type.model';
import { PhoneService } from '../phone.service';
import { PhonesComponent } from '../phones/phones.component';
@Component({
  selector: 'app-recherche-par-type',
  templateUrl: './recherche-par-type.component.html',
  styles: []
})
export class RechercheParTypeComponent implements OnInit {
  phones!: Phone[];  // Tableau pour stocker les objets de type Phone
  IdType!: number;   // ID du type sélectionné
  types!: Type[];    // Tableau pour stocker les objets de type

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {
    // Chargement des types au démarrage du composant
    this.phoneService.listeTypes().subscribe(typs => {
      this.types = typs._embedded.types; // Assurez-vous que la structure est correcte
      console.log(typs);
    });
  }

  onChange() {
    // Recherche des téléphones par type
    this.phoneService.rechercherParType(this.IdType).subscribe(phons => {
      this.phones = phons; // Stockage des téléphones récupérés
    });
  }

  supprimerPhone(phone: Phone) {
    const confirmDelete = confirm('Etes-vous sûr de vouloir supprimer ce téléphone ?');
    if (confirmDelete) {
      this.phoneService.supprimerPhone(phone.id).subscribe(() => {
        console.log('Téléphone supprimé');
        this.onChange(); // Actualisation de la liste des téléphones après la suppression
      });
    }
  }
}
