import { Injectable } from '@angular/core';
import { Phone } from './model/phone.model';
import { Type } from './model/type.model';
import {Image} from './model/image.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeWrapper } from './model/TypeWrapper';
import { AuthService } from './auth/auth.service';
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class PhoneService {
  apiURL: string = 'http://localhost:8082/phones/api';
  apiURLTyp: string = 'http://localhost:8082/phones/typ';

  constructor(private http: HttpClient,private authService: AuthService  ) {}
  
  private getHttpOptions() {
    const jwt = `Bearer ${this.authService.getToken()}`;
    return { headers: new HttpHeaders({ 'Authorization': jwt }) };
  }
  listePhones(): Observable<Phone[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Phone[]>(this.apiURL+"/all");
  }

  ajouterPhone(phon: Phone): Observable<Phone> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Phone>(this.apiURL+"/addphon", phon, {headers:httpHeaders});
}
  supprimerPhone(id: number) {
    const url = `${this.apiURL}/delphon/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.delete(url, {headers:httpHeaders});
    }

  consulterPhone(id: number): Observable<Phone> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Phone>(url,{headers:httpHeaders});
    }
    

  updatePhone(phon: Phone): Observable<Phone> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.put<Phone>(this.apiURL+"/updatephon", phon, {headers:httpHeaders});
    }

  listeTypes(): Observable<TypeWrapper> {
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<TypeWrapper>(this.apiURLTyp,{headers:httpHeaders}
    );
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

    uploadImage(file: File, filename: string): Observable<Image>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/upload'}`;
      return this.http.post<Image>(url, imageFormData);
      }


      loadImage(id: number): Observable<Image> {
        const url = `${this.apiURL + '/image/get/info'}/${id}`;
        return this.http.get<Image>(url);
        }

 
        uploadImagePhon(file: File, filename: string, id:number): Observable<any>{
          const imageFormData = new FormData();
          imageFormData.append('image', file, filename);
          const url = `${this.apiURL + '/image/uplaodImagePhon'}/${id}`;
          return this.http.post(url, imageFormData);
       }
          
       supprimerImage(id : number) {
        const url = `${this.apiURL}/image/delete/${id}`;
        return this.http.delete(url, httpOptions);
        }
  }