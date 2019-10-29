import { Component, OnInit } from '@angular/core';
import { Docente } from '../../models/docente.model';
import { DocenteService } from '../../services/service.index';
import Swal from 'sweetalert2';

//declare function iniciaProfe();

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styles: []
})
export class DocentesComponent implements OnInit {

  docentes: Docente[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _docenteService: DocenteService
  ) { }

  ngOnInit() {
    //iniciaProfe();
    this.cargarDocentes();
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
    this.cargarDocentes();
  }


  buscarDocente(termino: string) {
    if(termino.length <= 0) {
      this.cargarDocentes();
      return;
    }

    this._docenteService.buscarDocente(termino)
      .subscribe(docentes => this.docentes = docentes);
  }


  cargarDocentes() {
    this._docenteService.cargarDocentes(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.docentes = resp.docentes;
      });
  }


  eliminarDocente(docente: Docente) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estás a punto de borrar a " + docente.nombres + " " + docente.apellidos,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: "Cancelar"
    }).then((borrar) => {
      if(borrar.value) {
        this._docenteService.eliminarDocente(docente._id)
          .subscribe(() => {
            Swal.fire('Docente borrado', 'Eliminado correctamente', 'success');
            this.cargarDocentes();
          });
      }
    });
  }

}