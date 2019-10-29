import { Component, OnInit } from '@angular/core';

declare function iniciaClase();


@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styles: []
})
export class ClaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    iniciaClase();
  }

}
