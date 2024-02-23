import { Component, OnInit, AfterViewInit,ViewChild} from '@angular/core';

import{MatTableDataSource}from'@angular/material/table';
import{MatPaginator}from'@angular/material/paginator';
import{MatDialog}from '@angular/material/dialog';

import { ModalMantenimientoComponent } from '../../Modales/modal-mantenimiento/modal-mantenimiento.component';
import { Mantenimiento } from 'src/app/Interfaces/mantenimiento';
import { MantenimientoService } from 'src/app/Services/mantenimiento.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2'
import { Mantenimient } from 'src/app/Interfaces/response-api';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit, AfterViewInit{

  columnasTabla:string[] = ['nombre','categoria','stock','precio','estado','acciones'];
  dataInicio:Mantenimiento[] = [];
  dataListaMantenimiento = new MatTableDataSource(this.dataInicio);

  listaMantenimiento: Mantenimient[]=[];
  @ViewChild(MatPaginator)paginacionTabla!:MatPaginator;

  constructor(
    private dialog:MatDialog,
    private _mantenimientoServicio:MantenimientoService,
    private _utilidadServicio:UtilidadService
    
  ){}


  obtenerMantenimientos(){

    this._mantenimientoServicio.lista().subscribe({
    next:(data) => {
      if(data.status) {
        console.log('datos mantenimientos: ',data.value)
          //this.dataListaProductos.data = data.value;
          this.listaMantenimiento = data.value;
      }
       else
         this._utilidadServicio.mostrarAlerta("No se encontraron datos","Oops!")
    },
    error:(e) =>{}
  })

}


  ngOnInit(): void {
    this.obtenerMantenimientos();
  }

  ngAfterViewInit(): void {
    this.dataListaMantenimiento.paginator =this.paginacionTabla;
  }


       //metodo para aplicar el filtro a la tabla
 aplicarFiltroTabla(event:Event){
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataListaMantenimiento.filter = filterValue.trim().toLocaleLowerCase();
}


//metodo para abrir el modal cuando el usuario va dar para crear
nuevoMantenimiento(){
  this.dialog.open(ModalMantenimientoComponent, {
    disableClose:true
  }).afterClosed().subscribe(resultado => {
   if(resultado === "true")this.obtenerMantenimientos();
  });
  }

  editarMantenimiento(mantenimiento:Mantenimient){
    this.dialog.open(ModalMantenimientoComponent, {
      disableClose:true,
      data:mantenimiento
    }).afterClosed().subscribe(resultado => {
     if(resultado === "true")this.obtenerMantenimientos();
    });
    }

    eliminarMantenimiento(mantenimiento:Mantenimient){

      Swal.fire({
       title:'¿Desea eliminar el mantenimiento?',
       text: mantenimiento.nombre,
       icon:"warning",
       confirmButtonColor:'#3085d6',
       confirmButtonText: "Si,eliminar",
       showCancelButton:true,
       cancelButtonColor:'#d33',
       cancelButtonText:'No,Volver'
      }).then((resultado) => {
       
       if(resultado.isConfirmed){
   
         this._mantenimientoServicio.eliminar(mantenimiento.idMantenimiento).subscribe({
           next:(data) => {
   
             if(data.status){
               this._utilidadServicio.mostrarAlerta("El mantenimiento fue eliminado","Listo!");
               this.obtenerMantenimientos();
             }else
             this._utilidadServicio.mostrarAlerta("No se pudo eliminar el mantenimiento","Error");
           },
           error:(e)=>{}
   
   
         })
   
       }
   
      })
   
     }


}

