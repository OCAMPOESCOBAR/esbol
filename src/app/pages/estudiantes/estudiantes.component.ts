import { Component, OnInit } from '@angular/core';
declare function iniciaEstu();

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: []
})
export class EstudiantesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciaEstu();
  }

}
