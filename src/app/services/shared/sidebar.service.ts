import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Módulos',
      icono: 'mdi mdi-bullseye',
      submenu: [
        { titulo: 'Docentes', url: '/docentes' },
        { titulo: 'Estudiantes', url: '/estudiantes' },
        { titulo: 'Horario', url: '/horario' },
        { titulo: 'Asignaturas', url: '/materias' }
        // { titulo: 'Clase', url: '/clase' }
      ]
    }
  ];

  constructor() { }
}
