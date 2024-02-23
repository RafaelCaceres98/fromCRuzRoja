import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { VehiculoComponent } from './Pages/vehiculo/vehiculo.component';
import { MantenimientoComponent } from './Pages/mantenimiento/mantenimiento.component';
import { HistorialVehiculoComponent } from './Pages/historial-vehiculo/historial-vehiculo.component';
import { ReporteComponent } from './Pages/reporte/reporte.component';
import { SoatComponent } from './Pages/soat/soat.component';


const routes: Routes = [{
  path:'',
  component:LayoutComponent,
  children:[
   {path:'dashboard',component:DashBoardComponent},
   {path:'usuarios',component:UsuarioComponent},
   {path:'vehiculos',component:VehiculoComponent},
   {path:'Mantenimientos',component:MantenimientoComponent},
   {path:'Historial_Vehiculos',component:HistorialVehiculoComponent},
   {path:'Reportes',component:ReporteComponent},
   {path:'Soat',component:SoatComponent}
  ]
  
  }];

@NgModule({
  imports: 
  [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
