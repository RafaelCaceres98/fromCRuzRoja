import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";
import{Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { ResponseApi,ResponseMantenimiento } from '../Interfaces/response-api';
import { Mantenimiento } from '../Interfaces/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  private urlApi:string = environment.endpoint + "Mantenimiento/";

  constructor(private http:HttpClient) { }

  lista():Observable<ResponseMantenimiento>{
    return this.http.get<ResponseMantenimiento>(`${this.urlApi}Lista`)
  }

  guardar(request:Mantenimiento): Observable<ResponseMantenimiento>{
    return this.http.post<ResponseMantenimiento>(`${this.urlApi}Guardar`,request)
    }

    editar(request:Mantenimiento): Observable<ResponseMantenimiento>{
      return this.http.put<ResponseMantenimiento>(`${this.urlApi}Editar`,request)
      }
  


      eliminar(id:number): Observable<ResponseMantenimiento>{
        return this.http.delete<ResponseMantenimiento>(`${this.urlApi}Eliminar/${id}`)
        }
}
