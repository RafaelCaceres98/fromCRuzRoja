import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";
import{Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { ResponseApi,ResponseVehiculo } from '../Interfaces/response-api';
import { Vehiculo } from '../Clases/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private urlApi:string = environment.endpoint + "Vehiculo/";

  constructor(private http:HttpClient) { }

  lista():Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`${this.urlApi}Lista`)
  }
  
  guardar(request: Vehiculo):Observable<any>{
    return this.http.post<any>(`${this.urlApi}Guardar`,request)
     }
    
  
     editar(request: Vehiculo):Observable<ResponseVehiculo>{
      return this.http.put<ResponseVehiculo>(`${this.urlApi}Editar`,request)
       }
  
  
       eliminar(id: number):Observable<ResponseVehiculo>{
        return this.http.delete<ResponseVehiculo>(`${this.urlApi}Eliminar/${id}`)
         }







}
