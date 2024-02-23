
import { Component,  OnInit, Inject } from '@angular/core';


import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';


//import { Vehiculo } from 'src/app/Interfaces/vehiculo';
import { Vehiculo } from 'src/app/Clases/vehiculo';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { Vehiculos } from 'src/app/Interfaces/response-api';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-modal-vehiculo',
  templateUrl: './modal-vehiculo.component.html',
  styleUrls: ['./modal-vehiculo.component.css']
})
export class ModalVehiculoComponent implements OnInit{
  formularioVehiculo:FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaVehiculo: Vehiculo [] = [];

  constructor(
    private modalActual: MatDialogRef<ModalVehiculoComponent>,
  @Inject(MAT_DIALOG_DATA) public datosVehiculo: Vehiculo,
  private fb: FormBuilder,
  private _vehiculoServicio: VehiculoService,
  private _utilidadServicio: UtilidadService
  ){
    this.formularioVehiculo  = this.fb.group({
      numeroPlaca:['',Validators.required],
      modelo:['',Validators.required],
      marca:['',Validators.required],
      chasis:['',Validators.required],
      motor :['',Validators.required],
      tipo:['',Validators.required],
      numerdeMovil:['',Validators.required],
      propiedad:['',Validators.required],
      descripcioEstado:['',Validators.required],
      añoderecibidoelvehiculo:['',Validators.required],
      ubicacion:['',Validators.required],
      esActivo: ['',Validators.required], 
      fechaRegistro:['',Validators.required]
  });

  if(this.datosVehiculo != null){

    this.tituloAccion = "Editar";
     this.botonAccion = "Actualizar";
 }
 
 this._vehiculoServicio.lista().subscribe({
  next:(data) => {
    if(data) this.listaVehiculo = data;
  },
  error:(e) =>{}
})

 }

   ngOnInit(): void {

    if(this.datosVehiculo != null){ 
      this.formularioVehiculo.patchValue({
        numeroPlaca:this.datosVehiculo.numeroPlaca,
        modelo:this.datosVehiculo.modelo,
        marca:this.datosVehiculo.marca,
        chasis:this.datosVehiculo.chasis,
        motor:this.datosVehiculo.motor,
        tipo:this.datosVehiculo.tipo,
        numerdeMovil:this.datosVehiculo.numerdeMovil,
        propiedad:this.datosVehiculo.propiedad,
        descripcioEstado:this.datosVehiculo.descripcioEstado,
        añoderecibidoelvehiculo:this.datosVehiculo.anoderecibidoelvehiculo,
        ubicacion:this.datosVehiculo.ubicacion,
        esActivo:this.datosVehiculo.esActivo,
        fechaRegistro:this.datosVehiculo.fechaRegistro,
       
      });
   
   }

}

guardarEditar_Vehiculo(){

  const _vehiculo: Vehiculo= {

    idVehiculo: this.datosVehiculo == null ? 0: this.datosVehiculo.idVehiculo,
    numeroPlaca: this.formularioVehiculo.value.numeroPlaca,
    modelo: this.formularioVehiculo.value.modelo,
    marca: this.formularioVehiculo.value.marca,
    chasis:this.formularioVehiculo.value.chasis,
    motor: this.formularioVehiculo.value.motor,
    tipo: this.formularioVehiculo.value.tipo,
    numerdeMovil: this.formularioVehiculo.value.numerdeMovil,
    propiedad: this.formularioVehiculo.value.propiedad,
    descripcioEstado: this.formularioVehiculo.value.descripcioEstado,
    anoderecibidoelvehiculo: this.formularioVehiculo.value.añoderecibidoelvehiculo,
    ubicacion: this.formularioVehiculo.value.ubicacion,
    esActivo: this.formularioVehiculo.value.esActivo,
    fechaRegistro:this.formularioVehiculo.value.fechaRegistro
  
  }

      //ejecutar el servicio para guardar o editar vehiculo
      if(this.datosVehiculo == null){
       console.log(_vehiculo)
        this. _vehiculoServicio.guardar(_vehiculo).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El Vehiculo fue registrado","Exito");
              this.modalActual.close("true")
            }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el Vehiculo", "Error")
          },
          error:(e) =>{console.log(e)}
        })
    
      }else{
    
        this. _vehiculoServicio.editar(_vehiculo).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El vehiculo fue editado","Exito");
              this.modalActual.close("true")
            }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el vehiculo", "Error")
          },
          error:(e) =>{}
        })

      }
    }

}
