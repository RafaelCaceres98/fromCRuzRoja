import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashBoardComponent } from './Pages/dash-board/dash-board.component';
import { UsuarioComponent } from './Pages/usuario/usuario.component';
import { VehiculoComponent } from './Pages/vehiculo/vehiculo.component';
import { SoatComponent } from './Pages/soat/soat.component';
import { ReporteComponent } from './Pages/reporte/reporte.component';
import { MantenimientoComponent } from './Pages/mantenimiento/mantenimiento.component';
import { HistorialVehiculoComponent } from './Pages/historial-vehiculo/historial-vehiculo.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { ModalUsuarioComponent } from './Modales/modal-usuario/modal-usuario.component';
import { ModalMantenimientoComponent } from './Modales/modal-mantenimiento/modal-mantenimiento.component';
import { ModalVehiculoComponent } from './Modales/modal-vehiculo/modal-vehiculo.component';
import { ModalSoatComponent } from './Modales/modal-soat/modal-soat.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    UsuarioComponent,
    VehiculoComponent,
    SoatComponent,
    ReporteComponent,
    MantenimientoComponent,
    HistorialVehiculoComponent,
    ModalUsuarioComponent,
    ModalMantenimientoComponent,
    ModalVehiculoComponent,
    ModalSoatComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
