import { Component, OnInit } from '@angular/core';
import { ɵINTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic';

declare function inicia();

@Component({
  selector: 'app-clase',
  templateUrl: './clase.component.html',
  styles: []
})
export class ClaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    inicia();
  }

}
