import { Component, Inject, OnInit, inject } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Mantenimiento } from 'src/app/Interfaces/mantenimiento';
import { MantenimientoService } from 'src/app/Services/mantenimiento.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { TipoMantenimientoService } from 'src/app/Services/tipo-mantenimiento.service';
import { Mantenimient, TipoMantenimiento } from 'src/app/Interfaces/response-api';

@Component({
  selector: 'app-modal-mantenimiento',
  templateUrl: './modal-mantenimiento.component.html',
  styleUrls: ['./modal-mantenimiento.component.css']
})
export class ModalMantenimientoComponent implements OnInit {
  formularioMantenimiento: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaTipoMantenimiento: TipoMantenimiento[] = [];


  constructor(
    private modalActual: MatDialogRef<ModalMantenimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosMantenimiento: Mantenimiento,
    private fb: FormBuilder,
    private _tipoMantenimientoservice: TipoMantenimientoService,
    private _mantenimientoServicio: MantenimientoService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioMantenimiento = this.fb.group({

      IdTipoMantenimiento: ['', Validators.required],
      descripcionMantenimiento: ['', Validators.required],
      Kilometraje: ['', Validators.required],
      estadodelVehiculo: ['', Validators.required],
      observaciones: ['', Validators.required],
    });


    if (this.datosMantenimiento != null) {

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._tipoMantenimientoservice.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaTipoMantenimiento = data.value
      },
      error: (e) => { }
    })

  }

  ngOnInit(): void {
    if (this.datosMantenimiento != null) {
      this.formularioMantenimiento.patchValue({


        IdTipoMantenimiento: this.datosMantenimiento.IdTipoMantenimiento,
        descripcionMantenimiento: this.datosMantenimiento.descripcionMantenimiento,
        Kilometraje: this.datosMantenimiento.Kilometraje,
        estadodelVehiculo: this.datosMantenimiento.estadodelVehiculo,
        observaciones: this.datosMantenimiento.observaciones,

      });
    }
  }

  guardarEditar_Mantenimiento() {

   // console.log(this.formularioMantenimiento.value)

//     const _mantenimiento: Mantenimiento = {

//       idMantenimiento: this.datosMantenimiento == null ? 0 : this.datosMantenimiento.idMantenimiento,
//       IdTipoMantenimiento: this.formularioMantenimiento.value.IdTipoMantenimiento,
//       fechaRegistro: this.formularioMantenimiento.value.fechaRegistro,
//       descripcionMantenimiento: "",
//       Kilometraje: this.formularioMantenimiento.value.Kilometraje,
//       estadodelVehiculo: this.formularioMantenimiento.value.estadodelVehiculo,
//       observaciones: (this.formularioMantenimiento.value.observaciones),
//     }

//     //ejecutar el servicio para guardar o editar usuario
//     if (this.datosMantenimiento == null) {

//       this._mantenimientoServicio.guardar(_mantenimiento).subscribe({
//         next: (data) => {
//           if (data.status) {
//             this._utilidadServicio.mostrarAlerta("El Mantenimiento fue registrado", "Exito");
//             this.modalActual.close("true")
//           } else
//             this._utilidadServicio.mostrarAlerta("No se pudo registrar el Mantenimiento", "Error")
//         },
//         error: (e) => { }
//       })

//     } else {

//       this._mantenimientoServicio.editar(_mantenimiento).subscribe({
//         next: (data) => {
//           if (data.status) {
//             this._utilidadServicio.mostrarAlerta("El Mantenimiento fue editado", "Exito");
//             this.modalActual.close("true")
//           } else
//             this._utilidadServicio.mostrarAlerta("No se pudo editar el Mantenimiento", "Error")
//         },
//         error: (e) => { }
//       })

//     }

//   }
// }

  }
}