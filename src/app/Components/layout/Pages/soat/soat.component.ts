import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';

import{MatTableDataSource}from'@angular/material/table';
import{MatPaginator}from'@angular/material/paginator';
import{MatDialog}from '@angular/material/dialog';

import { ModalSoatComponent } from '../../Modales/modal-soat/modal-soat.component';
import { Soat } from 'src/app/Interfaces/soat';
import { SoatService } from 'src/app/Services/soat.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-soat',
  templateUrl: './soat.component.html',
  styleUrls: ['./soat.component.css']
})
export class SoatComponent implements OnInit {

columnasTabla:string[] = ['FechaSolicitud','FechaVencimiento','Tiempo','PorcentajeVencimiento','Periodicidad'];
dataInicio:Soat[] = [];
dataListaSoat = new MatTableDataSource(this.dataInicio);

listaSoat: Soat[] =[];


@ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

  constructor(
    private dialog:MatDialog,
    private _soatServicio:SoatService,
    private _utilidadServicio:UtilidadService
  ){}



  ngOnInit(): void {
    this.obtenerSoat();
  }

  obtenerSoat(){

    this._soatServicio.lista().subscribe({
    next:(data) => {
      if(data) {
        console.log('datos vehiculos: ',data)
          //this.dataListaVehiculosi.data = data.value;
        //  this.dataListaSoat.data = data;
          //this.listaSoat = data;
          console.log("esta es la lista de los soat", this.listaSoat)
          
      }
       else
         this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops!")
    },
    error:(e) =>{}
  })

}

ngAfterViewInit(): void {
  this.dataListaSoat.paginator =this.paginacionTabla;
}


   //metodo para aplicar el filtro a la tabla
   aplicarFiltroTabla(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaSoat.filter = filterValue.trim().toLocaleLowerCase();
  }


  //metodo para abrir el modal cuando el vehiculo va dar para crear
nuevoSoat(){
  this.dialog.open(ModalSoatComponent, {
    disableClose:true
  }).afterClosed().subscribe(resultado => {
   if(resultado === "true")this.obtenerSoat();
  });
  }

  editarSoat(vehiculo:Soat){
    this.dialog.open(ModalSoatComponent, {
      disableClose:true,
      data:vehiculo
    }).afterClosed().subscribe(resultado => {
     if(resultado === "true")this.obtenerSoat();
    });
    }

    eliminar(soat:Soat){

      Swal.fire({
       title:'¿Desea eliminar el Vehiculo?',
       text: soat.Periodicidad,
       icon:"warning",
       confirmButtonColor:'#3085d6',
       confirmButtonText: "Si,eliminar",
       showCancelButton:true,
       cancelButtonColor:'#d33',
       cancelButtonText:'No,Volver'
      }).then((resultado) => {
       
       if(resultado.isConfirmed){

         this._soatServicio.eliminar(soat.IdSoat).subscribe({
           next:(data) => {
   
             if(data.status){
               this._utilidadServicio.mostrarAlerta("El Soat fue eliminado","Listo!");
               this.obtenerSoat();
             }else
             this._utilidadServicio.mostrarAlerta("No se pudo eliminar el Soat","Error");
           },
           error:(e)=>{}
   
   
         })
   
       }
   
      })
   
     }


}
