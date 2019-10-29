import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Asignatura } from 'src/app/models/asignatura.model';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarAsignaturas() {
    let url = URL_SERVICIOS + '/asignatura';

    return this.http.get(url).pipe(
      map((resp: any) => resp.asignaturas));
  }


  obtenerAsignatura(id: string) {
    let url = URL_SERVICIOS + '/asignatura/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.asignatura)
    );
  }


  eliminarAsignatura(id: string) {
    let url = URL_SERVICIOS + '/asignatura/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  crearAsignatura(asignatura: Asignatura) {
    let url = URL_SERVICIOS + '/asignatura?token=' + this._usuarioService.token;

    return this.http.post(url, asignatura).pipe(
      map((resp: any) => resp.asignatura)
    );
  }


  buscarAsignatura(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/asignaturas/' + termino;


    return this.http.get(url).pipe(
      map((resp: any) => resp.asignaturas)
    );
  }


  actualizarAsignatura(asignatura: Asignatura) {
    let url = URL_SERVICIOS + '/asignatura/' + asignatura._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, asignatura).pipe(
      map((resp: any) => resp.asignatura)
    );
  }
  
}
