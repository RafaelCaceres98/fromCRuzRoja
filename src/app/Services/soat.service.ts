import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";
import{Observable} from "rxjs";
import { environment } from 'src/environments/environment'; 
import { ResponseApi, ResponseSoat } from '../Interfaces/response-api';
import { Soat } from '../Interfaces/soat';
import { Soat1 } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class SoatService {


  private urlApi:string = environment.endpoint + "Soat/";

  constructor(private http:HttpClient) { }

  lista():Observable<ResponseSoat>{
    return this.http.get<ResponseSoat>(`${this.urlApi}Lista`)
  }

  guardar(request: Soat):Observable<ResponseSoat>{
    return this.http.post<ResponseSoat>(`${this.urlApi}Guardar`,request)
     }
    
       
     editar(request: Soat):Observable<ResponseSoat>{
      return this.http.put<ResponseSoat>(`${this.urlApi}Editar`,request)
       }


         
       eliminar(id: number):Observable<ResponseSoat>{
        return this.http.delete<ResponseSoat>(`${this.urlApi}Eliminar/${id}`)
         }

}
