export class Vehiculo {
    idVehiculo:number
    numeroPlaca:string
    modelo:string
    marca:string
    chasis:string
    motor:string
    tipo:string
    numerdeMovil:string
    propiedad:string
    descripcioEstado:string
    anoderecibidoelvehiculo:string
    ubicacion:string
    esActivo:boolean
    fechaRegistro:Date

    constructor(){
        this.idVehiculo = 0
        this.numeroPlaca = ""
        this.modelo = ""
        this.marca = ""
        this.chasis = ""
        this.motor = ""
        this.tipo = ""
        this.numerdeMovil = ""
        this.propiedad = ""
        this.descripcioEstado = ""
        this.anoderecibidoelvehiculo = ""
        this.ubicacion= "",
        this.esActivo = false   
        this.fechaRegistro = new Date
    }
}

