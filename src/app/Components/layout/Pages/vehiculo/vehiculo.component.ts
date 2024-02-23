import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';

import{MatTableDataSource}from'@angular/material/table';
import{MatPaginator}from'@angular/material/paginator';
import{MatDialog}from '@angular/material/dialog';

import { ModalVehiculoComponent } from '../../Modales/modal-vehiculo/modal-vehiculo.component';
//import { Vehiculo } from 'src/app/Interfaces/vehiculo';
import { VehiculoService } from 'src/app/Services/vehiculo.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';
//import { Vehiculos } from 'src/app/Interfaces/response-api';
import { Vehiculo } from 'src/app/Clases/vehiculo';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit, AfterViewInit {


columnasTabla:string[] = ['numeroPlaca','modelo','marca','chasis','motor','tipo','numerdeMovil','propiedad','descripcioEstado','anoderecibidoelvehiculo','ubicacion','esActivo','fechaRegistro','acciones'];
dataInicio:Vehiculo[] = [];
dataListaVehiculos = new MatTableDataSource(this.dataInicio);


listaVehiculos: Vehiculo[] =[];


@ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

  constructor(
    private dialog:MatDialog,
    private _vehiculoServicio:VehiculoService,
    private _utilidadServicio:UtilidadService
  ){}

  ngOnInit(): void {
    this.obtenerVehiculo();
  }

  obtenerVehiculo(){

    this._vehiculoServicio.lista().subscribe({
    next:(data) => {
      if(data) {
        console.log('datos vehiculos: ',data)
          //this.dataListaVehiculosi.data = data.value;
          this.dataListaVehiculos.data = data;
          this.listaVehiculos = data;
          console.log("esta es la lista de los vehiculos", this.listaVehiculos)
          
      }
       else
         this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops!")
    },
    error:(e) =>{}
  })

}


 

  ngAfterViewInit(): void {
    this.dataListaVehiculos.paginator =this.paginacionTabla;
  }

     //metodo para aplicar el filtro a la tabla
 aplicarFiltroTabla(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataListaVehiculos.filter = filterValue.trim().toLocaleLowerCase();
}

//metodo para abrir el modal cuando el vehiculo va dar para crear
nuevoVehiculo(){
  this.dialog.open(ModalVehiculoComponent, {
    disableClose:true
  }).afterClosed().subscribe(resultado => {
   if(resultado === "true")this.obtenerVehiculo();
  });
  }

  editarVehiculo(vehiculo:Vehiculo){
    this.dialog.open(ModalVehiculoComponent, {
      disableClose:true,
      data:vehiculo
    }).afterClosed().subscribe(resultado => {
     if(resultado === "true")this.obtenerVehiculo();
    });
    }


    eliminarVehiculo(vehiculo:Vehiculo){

      Swal.fire({
       title:'¿Desea eliminar el Vehiculo?',
       text: vehiculo.numeroPlaca,
       icon:"warning",
       confirmButtonColor:'#3085d6',
       confirmButtonText: "Si,eliminar",
       showCancelButton:true,
       cancelButtonColor:'#d33',
       cancelButtonText:'No,Volver'
      }).then((resultado) => {
       
       if(resultado.isConfirmed){

         this._vehiculoServicio.eliminar(vehiculo.idVehiculo).subscribe({
           next:(data) => {
   
             if(data.status){
               this._utilidadServicio.mostrarAlerta("El vehiculo fue eliminado","Listo!");
               this.obtenerVehiculo();
             }else
             this._utilidadServicio.mostrarAlerta("No se pudo eliminar el Vehiculo","Error");
           },
           error:(e)=>{}
   
   
         })
   
       }
   
      })
   
     }


}
