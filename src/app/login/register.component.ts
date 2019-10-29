import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }
      
      return {
        sonIguales: true
      };
    };
  }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')});

    /* this.forma.setValue({
      nombre: 'Test',
      correo: 'test@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    }); */
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      Swal.fire('Importante', 'Debes aceptar los términos y condiciones', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }


  terminos() {
    Swal.fire({
      title: 'Términos y Condiciones',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget consectetur magna, sit amet semper urna. Donec vitae ex lobortis, blandit odio a, pellentesque leo. Nullam eget risus pretium sapien dictum congue. Sed iaculis aliquet accumsan. In odio metus, porttitor quis mollis sed, mollis sed nunc. Proin non quam sed justo auctor consectetur vitae in diam. Morbi gravida nulla ac felis finibus viverra. Sed laoreet neque vitae est tincidunt laoreet. Mauris odio mauris, imperdiet quis rhoncus sit amet, ultricies et purus. Nam semper urna felis, nec facilisis tortor cursus eget. Mauris ultrices et nibh nec tristique. Duis eu lorem mi. Vestibulum placerat, eros vel blandit eleifend, ante neque sagittis est, vitae suscipit ante est vitae felis. Morbi quis eros bibendum, ultrices leo ut, molestie purus. Vivamus pellentesque at sapien a ornare. Praesent sed aliquet nunc.'
    });
  }

}
