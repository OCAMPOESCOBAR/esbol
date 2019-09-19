import { Component, OnInit } from '@angular/core';
declare function iniciaMate();
declare function iniciaAñadir();
declare function iniciaEvento();
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styles: []
})
export class MateriasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciaMate();
    iniciaAñadir();
    iniciaEvento();
  }

}
