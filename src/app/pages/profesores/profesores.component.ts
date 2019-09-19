import { Component, OnInit } from '@angular/core';

declare function iniciaProfe();

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styles: []
})
export class ProfesoresComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciaProfe();
  }

}
