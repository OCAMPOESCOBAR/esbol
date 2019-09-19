import { Component, OnInit } from '@angular/core';
declare function iniciaHorario();

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styles: []
})
export class HorarioComponent implements OnInit {
   
  constructor() { }

  ngOnInit() {
    iniciaHorario();
  }

}
