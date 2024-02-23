import { Injectable } from '@angular/core';

import{HttpClient} from "@angular/common/http";
import{Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { RespTipoMantenimiento, ResponseApi } from '../Interfaces/response-api';
import { TipoMantenimiento } from '../Interfaces/tipo-mantenimiento'; 

@Injectable({
  providedIn: 'root'
})
export class TipoMantenimientoService {

  private urlApi:string = environment.endpoint + "TipoMantenimiento/";

  constructor(private http:HttpClient) { }

  lista():Observable<RespTipoMantenimiento>{
    return this.http.get<RespTipoMantenimiento>(`${this.urlApi}Lista`)
  }

}
