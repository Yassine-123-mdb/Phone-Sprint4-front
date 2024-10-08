import { Injectable } from '@angular/core';
import { Phone } from './model/phone.model';
import { Type } from './model/type.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeWrapper } from './model/TypeWrapper';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  apiURL: string = 'http://localhost:8082/phones/api';
  apiURLTyp: string = 'http://localhost:8082/phones/typ';

  constructor(private http: HttpClient) {}

  listePhones(): Observable<Phone[]> {
    return this.http.get<Phone[]>(this.apiURL);
  }

  ajouterPhone(phon: Phone): Observable<Phone> {
    return this.http.post<Phone>(this.apiURL, phon, httpOptions);
  }

  supprimerPhone(id: number) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  consulterPhone(id: number): Observable<Phone> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Phone>(url);
  }

  updatePhone(phon: Phone): Observable<Phone> {
    return this.http.put<Phone>(this.apiURL, phon, httpOptions);
  }

  listeTypes(): Observable<TypeWrapper> {
    return this.http.get<TypeWrapper>(this.apiURLTyp);
  }
  

  rechercherParType(idTyp: number): Observable<Phone[]> {
    const url = `${this.apiURL}/phonstype/${idTyp}`;
    return this.http.get<Phone[]>(url);
  }

  rechercherParMarque(marque: string): Observable<Phone[]> {
    const url = `${this.apiURL}/phonsByMarque/${marque}`;
    return this.http.get<Phone[]>(url);
  }
  ajouterType( cat: Type):Observable<Type>{
    return this.http.post<Type>(this.apiURLTyp, cat, httpOptions);
    }
}
