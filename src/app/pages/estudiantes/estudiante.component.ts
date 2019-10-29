import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante.model';
import { EstudianteService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: []
})
export class EstudianteComponent implements OnInit {

  estudiante: Estudiante = new Estudiante('', '', '', '', '', '');

  constructor(
    public _estudianteService: EstudianteService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id != 'nuevo') {
        this.cargarEstudiante(id);
      }
    });
  }

  ngOnInit() {
  }


  cargarEstudiante(id: string) {
    this._estudianteService.obtenerEstudiante(id)
      .subscribe(estudiante => this.estudiante = estudiante);
  }


  guardarEstudiante(f: NgForm) {
    if(f.invalid) {
      return;
    }

    this._estudianteService.guardarEstudiante(this.estudiante)
      .subscribe(estudiante => {
        this.estudiante._id = estudiante._id;
        this.router.navigate(['/estudiante', estudiante._id]);
      });
  }

}
