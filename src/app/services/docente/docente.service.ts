import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Docente } from 'src/app/models/docente.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  totalDocentes: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarDocentes(desde: number = 0) {
    let url = URL_SERVICIOS + '/docente?desde=' + desde;

    return this.http.get(url);
    /* return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalDocentes = resp.total;
        return resp.docentes;
      })); */
  }
  

  obtenerDocente(id: string) {
    let url = URL_SERVICIOS + '/docente/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.docente)
    );
  }


  eliminarDocente(id: string) {
    let url = URL_SERVICIOS + '/docente/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  buscarDocente(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/docentes/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.docentes)
    );
  }


  actualizarDocente(docente: Docente) {
    let url = URL_SERVICIOS + '/docente/' + docente._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, docente).pipe(
      map((resp: any) => resp.docente)
    );
  }


  guardarDocente(docente: Docente) {
    let url = URL_SERVICIOS + '/docente';

    if(docente._id) {
      // Actualizar
      url += '/' + docente._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, docente).pipe(
        map((resp: any) => {
          Swal.fire('Docente actualizado', docente.nombres + ' ' + docente.apellidos, 'success');
          return resp.docente;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, docente).pipe(
        map((resp: any) => {
          Swal.fire('Docente creado', docente.nombres + ' ' + docente.apellidos, 'success');
          return resp.docente;
        }));
    }
  }

}