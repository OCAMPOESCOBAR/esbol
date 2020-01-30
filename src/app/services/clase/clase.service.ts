import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Clase } from '../../models/clase.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarClases() {
    let url = URL_SERVICIOS + '/clase';

    return this.http.get(url);
  }


  obtenerClase(id: string) {
    let url = URL_SERVICIOS + '/clase/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.clase)
    );
  }


  eliminarClase(id: string) {
    let url = URL_SERVICIOS + '/clase/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  crearClase(clase: Clase) {
    let url = URL_SERVICIOS + '/clase?token=' + this._usuarioService.token;

    return this.http.post(url, clase).pipe(
      map((resp: any) => resp.clase)
    );
  }


  buscarClase(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/clases/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.clase)
    );
  }


  actualizarClase(clase: Clase) {
    let url = URL_SERVICIOS + '/clase/' + clase._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, clase).pipe(
      map((resp: any) => resp.clase)
    );
  }


  guardarClase(clase: Clase) {
    let url = URL_SERVICIOS + '/clase';

    if(clase._id) {
      // Actualizar
      url += '/' + clase._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, clase).pipe(
        map((resp: any) => {
          Swal.fire('Clase actualizada', clase.asignatura, 'success');
          return resp.clase;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, clase).pipe(
        map((resp: any) => {
          Swal.fire('Clase creada', clase.asignatura, 'success');
          return resp.clase;
        }));
    }
  }

}
