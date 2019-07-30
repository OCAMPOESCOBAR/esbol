import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Aplicaciones',
      icono: 'mdi mdi-bullseye',
      submenu: [
        { titulo: 'Profesores', url: '/profesores' },
        { titulo: 'Estudiantes', url: '/estudiantes' },
        { titulo: 'Horario', url: '/horario' },
        { titulo: 'Clase', url: '/clase' }
      ]
    }
  ];

  constructor() { }
}
