import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Estudiante } from '../../models/estudiante.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  totalEstudiantes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarEstudiantes(desde: number = 0) {
    let url = URL_SERVICIOS + '/estudiante?desde=' + desde;

    return this.http.get(url);
  }


  obtenerEstudiante(id: string) {
    let url = URL_SERVICIOS + '/estudiante/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.estudiante)
    );
  }


  eliminarEstudiante(id: string) {
    let url = URL_SERVICIOS + '/estudiante/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  crearEstudiante(estudiante: Estudiante) {
    let url = URL_SERVICIOS + '/estudiante?token=' + this._usuarioService.token;

    return this.http.post(url, estudiante).pipe(
      map((resp: any) => resp.estudiante)
    );
  }


  buscarEstudiante(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/estudiantes/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.estudiantes)
    );
  }


  actualizarEstudiante(estudiante: Estudiante) {
    let url = URL_SERVICIOS + '/estudiante/' + estudiante._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, estudiante).pipe(
      map((resp: any) => resp.estudiante)
    );
  }


  guardarEstudiante(estudiante: Estudiante) {
    let url = URL_SERVICIOS + '/estudiante';

    if(estudiante._id) {
      // Actualizar
      url += '/' + estudiante._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, estudiante).pipe(
        map((resp: any) => {
          Swal.fire('Estudiante actualizado', estudiante.nombres + ' ' + estudiante.apellidos, 'success');
          return resp.estudiante;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, estudiante).pipe(
        map((resp: any) => {
          Swal.fire('Estudiante creado', estudiante.nombres + ' ' + estudiante.apellidos, 'success');
          return resp.estudiante;
        }));
    }
  }

}