import {Component, Inject, OnInit, inject } from '@angular/core';

import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import{MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Soat } from 'src/app/Interfaces/soat';

import { SoatService } from 'src/app/Services/soat.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

 

@Component({
  selector: 'app-modal-soat',
  templateUrl: './modal-soat.component.html',
  styleUrls: ['./modal-soat.component.css']
})
export class ModalSoatComponent implements OnInit {


   //creacion de variables
   formularioSoat:FormGroup;
   //ocultarPassword: boolean = true;
   tituloAccion:string = "Agregar";
   botonAccion:string = "Guardar";
   listaSoat: Soat[] = [];


  constructor(
      //inyectar dependencia
   private modalActual: MatDialogRef<ModalSoatComponent>,
   @Inject(MAT_DIALOG_DATA) public datosSoat: Soat,
   private fb: FormBuilder,

    //inyeccion de nuestros servicios
   private _soatServicio: SoatService,
   private _utilidadServicio: UtilidadService

  ) {

     //declarar los campos de nuestro formulario

     this.formularioSoat = this.fb.group({

      FechaSolicitud: ['',Validators.required],
      FechaVencimiento: ['',Validators.required],
      Tiempo: ['',Validators.required],
      PorcentajeVencimiento: ['',Validators.required],
      Periodicidad: ['',Validators.required]

   });

   if(this.datosSoat != null){

    this.tituloAccion = "Editar";
     this.botonAccion = "Actualizar";
  }

  this._soatServicio.lista().subscribe({
    next:(data) => {
      if(data.status) this.listaSoat = data.value
    },
    error:(e) =>{}
  })
   
  }
  

  ngOnInit(): void {
    if(this.datosSoat != null){

      this.formularioSoat.patchValue({
        FechaSolicitud: this.datosSoat.FechaSolicitud,
        FechaVencimiento: this.datosSoat.FechaVencimiento,
        Tiempo: this.datosSoat.Tiempo,
        PorcentajeVencimiento: this.datosSoat.PorcentajeVencimiento,
        Periodicidad: this.datosSoat.Periodicidad
  })
   }
 }


 guardarEditar_Soat(){

  const _soat: Soat = {

    IdSoat: this.datosSoat == null ? 0: this.datosSoat.IdSoat,
    FechaSolicitud: this.formularioSoat.value.FechaSolicitud,
    FechaVencimiento: this.formularioSoat.value.fe,
    Tiempo: this.formularioSoat.value.Tiempo,
    PorcentajeVencimiento: this.formularioSoat.value.PorcentajeVencimiento,
    Periodicidad: this.formularioSoat.value.Periodicidad,
   
  }
  
      //ejecutar el servicio para guardar o editar usuario
      if(this.datosSoat == null){
  
        this. _soatServicio.guardar(_soat).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El Soat fue registrado","Exito");
              this.modalActual.close("true")
            }else
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el Soat", "Error")
          },
          error:(e) =>{}
        })
    
      }else{
    
        this. _soatServicio.editar(_soat).subscribe({
          next:(data) => {
            if(data.status){
              this._utilidadServicio.mostrarAlerta("El Soat fue editado","Exito");
              this.modalActual.close("true")
            }else
            this._utilidadServicio.mostrarAlerta("No se pudo editar el Soat", "Error")
          },
          error:(e) =>{}
        })
    
      }
    
      }
    }







