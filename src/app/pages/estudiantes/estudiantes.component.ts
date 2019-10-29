import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { EstudianteService } from '../../services/service.index';
import Swal from 'sweetalert2';

//declare function iniciaEstu();

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: []
})
export class EstudiantesComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _estudianteService: EstudianteService
  ) { }

  ngOnInit() {
    this.cargarEstudiantes();
  }


  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros) {
      return;
    }

    if(desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarEstudiantes();
  }


  buscarEstudiante(termino: string) {
    if(termino.length <= 0) {
      this.cargarEstudiantes();
      return;
    }

    this._estudianteService.buscarEstudiante(termino)
      .subscribe(estudiantes => this.estudiantes = estudiantes);
  }


  cargarEstudiantes() {
    this._estudianteService.cargarEstudiantes(this.desde)
      .subscribe((resp: any) => {
        this.estudiantes = resp.estudiantes;
        this.totalRegistros = resp.total;
      });
  }


  eliminarEstudiante(estudiante: Estudiante) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de borrar a ' + estudiante.nombres + ' ' + estudiante.apellidos,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: "Cancelar"
    }).then((borrar) => {
      if(borrar.value) {
        this._estudianteService.eliminarEstudiante(estudiante._id)
          .subscribe(() => {
            Swal.fire('Estudiante borrado', 'Eliminado corrextamente', 'success');
            this.cargarEstudiantes();
          });
      }
    });
  }

}