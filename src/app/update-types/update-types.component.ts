import { Component,Input ,Output ,EventEmitter } from '@angular/core';
import { Type } from '../model/type.model';

@Component({
  selector: 'app-update-types',
  templateUrl: './update-types.component.html',
  styles: ``
})
export class UpdateTypesComponent {
  @Input()
  type! : Type;
  @Input()
  ajout!:boolean;
  @Output()
  typeUpdated = new EventEmitter<Type>();
  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateCategorie ",this.type);
    }
    saveType(){
      this.typeUpdated.emit(this.type);
      }
}
