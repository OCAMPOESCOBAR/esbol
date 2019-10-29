import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Seccion } from 'src/app/models/seccion.model';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarSecciones() {
    let url = URL_SERVICIOS + '/seccion';

    return this.http.get(url).pipe(
      map((resp: any) => resp.secciones));
  }


  obtenerSeccion(id: string) {
    let url = URL_SERVICIOS + '/seccion/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.seccion));
  }


  eliminarSeccion(id: string) {
    let url = URL_SERVICIOS + '/seccion/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  crearSeccion(seccion: Seccion) {
    let url = URL_SERVICIOS + '/seccion?token=' + this._usuarioService.token;

    return this.http.post(url, seccion).pipe(
      map((resp: any) => resp.seccion)
    );
  }


  buscarSeccion(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/secciones/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.secciones)
    );
  }


  actualizarSeccion(seccion: Seccion) {
    let url = URL_SERVICIOS + '/seccion/' + seccion._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, seccion).pipe(
      map((resp: any) => resp.seccion)
    );
  }
  
}
