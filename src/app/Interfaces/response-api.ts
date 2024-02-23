export interface ResponseApi {
    status:boolean,
    msg: string,
    value:any
}


export interface ResponseUsuario{
    status: boolean;
    msg:string;
    value: Usuari[]
  }


  export interface ResponseMantenimiento{
    status: boolean;
    msg:string;
    value: Mantenimient[]
  }

  export interface RespTipoMantenimiento {
    status: boolean;
    msg:string;
    value: TipoMantenimiento[]

  }

  export interface ResponseSoat{
    status: boolean;
    msg:string;
    value: Soat1[]
  }

  export interface Usuari {
    idUsuario: number;
    nombreCompleto: string
    correo: string,
    idRol: number,
    rolDescripcion: string,
    clave: string,
    esActivo: number
  }


  export interface Mantenimient{
    idMantenimiento:number,
    IdTipoMantenimiento:number,
    nombre:string,
    fechaRegistro:string,
    descripcionMantenimiento:string,
    Kilometraje:string,
    estadodelVehiculo:string,
    observaciones:string
}

export interface TipoMantenimiento {
  idTipoMantenimiento: number;
  nombre: string
}


export interface ResponseVehiculo {
  status: boolean;
  msg:string;
  value: Vehiculos[]

}


export interface Vehiculos{
  idVehiculo:number,
  numeroPlaca:string,
  modelo:string,
  marca:string,
  chasis:string,
  motor:string,
  tipo:string,
  numerdeMovil:string,
  propiedad:string,
  descripcioEstado:string,
  añoderecibidoelvehiculo:string,
  ubicacion:string
  esActivo:number,
  fechaRegistro:string,  
}

export interface Soat1{
  IdSoat:number,
  FechaSolicitud: Date,
  FechaVencimiento:Date,
  Tiempo:number,
  PorcentajeVencimiento:number,
  Periodicidad:string

}