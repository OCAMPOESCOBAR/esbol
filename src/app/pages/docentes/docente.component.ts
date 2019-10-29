import { Component, OnInit } from '@angular/core';
import { Docente } from '../../models/docente.model';
import { Seccion } from 'src/app/models/seccion.model';
import { DocenteService, CompaniaService, SeccionService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Compania } from 'src/app/models/compania.model';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styles: []
})
export class DocenteComponent implements OnInit {

  compania: Compania = new Compania('', '');
  companias: Compania[] = [];

  seccion: Seccion = new Seccion('');
  secciones: Seccion[] = [];

  docente: Docente = new Docente('', '', '', '', '', '', '', '', '', '', '');

  constructor(
    public _docenteService: DocenteService,
    public _companiaService: CompaniaService,
    public _seccionService: SeccionService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id != 'nuevo') {
        this.cargarDocente(id);
      }
    });
  }

  ngOnInit() {
    this._companiaService.cargarCompanias()
      .subscribe(companias => this.companias = companias);
  }


  cargarDocente(id: string) {
    this._docenteService.obtenerDocente(id)
      .subscribe(docente => {
        this.docente = docente;
        this.docente.compania = docente.compania._id;
        this.obtenerCompanias(this.docente.compania);
      });
  }


  guardarDocente(f: NgForm) {
    if(f.invalid) {
      return;
    }

    this._docenteService.guardarDocente(this.docente)
      .subscribe(docente => {
        this.docente._id = docente._id;
        this.router.navigate(['/docente', docente._id]);
      });
  }


  obtenerCompanias(id: string) {
    this._companiaService.obtenerCompania(id)
      .subscribe(compania => this.compania = compania);
  }

  
  obtenerSecciones(id: string) {
    this._seccionService.obtenerSeccion(id)
      .subscribe(seccion => this.seccion = seccion);
  }
  
}