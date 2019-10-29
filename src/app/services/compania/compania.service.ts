import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Compania } from 'src/app/models/compania.model';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarCompanias() {
    let url = URL_SERVICIOS + '/compania';
    
    return this.http.get(url).pipe(
      map((resp: any) => resp.companias));
  }


  obtenerCompania(id: string) {
    let url = URL_SERVICIOS + '/compania/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.compania)
    );
  }


  eliminarCompania(id: string) {
    let url = URL_SERVICIOS + '/compania/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  crearCompania(compania: Compania) {
    let url = URL_SERVICIOS + '/compania?token=' + this._usuarioService.token;

    return this.http.post(url, compania).pipe(
      map((resp: any) => resp.compania)
    );
  }


  buscarCompania(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/companias/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.companias)
    );
  }


  actualizarCompania(compania: Compania) {
    let url = URL_SERVICIOS + '/compania/' + compania._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, compania).pipe(
      map((resp: any) => resp.compania)
    );
  }

}