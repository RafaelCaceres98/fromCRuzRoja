import { Injectable } from '@angular/core';



import{HttpClient} from "@angular/common/http";
import{Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { ResponseApi, ResponseUsuario } from '../Interfaces/response-api';

import { Login } from '../Interfaces/login';
import { Usuario } from '../Interfaces/usuario';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {



 private urlApi:string = environment.endpoint + "Usuario/";



  constructor(private http:HttpClient) { }

  iniciarSesion(request:Login): Observable<ResponseApi>{
 return this.http.post<ResponseApi>(`${this.urlApi}iniciarSesion`,request)
 }

 
  lista():Observable<ResponseUsuario>{
    return this.http.get<ResponseUsuario>(`${this.urlApi}Lista`)

  }

  guardar(request:Usuario): Observable<ResponseUsuario>{
    return this.http.post<ResponseUsuario>(`${this.urlApi}Guardar`,request)
    }

    editar(request:Usuario): Observable<ResponseUsuario>{
      return this.http.put<ResponseUsuario>(`${this.urlApi}Editar`,request)
      }
  


      eliminar(id:number): Observable<ResponseUsuario>{
        return this.http.delete<ResponseUsuario>(`${this.urlApi}Eliminar/${id}`)
        }
   

}

