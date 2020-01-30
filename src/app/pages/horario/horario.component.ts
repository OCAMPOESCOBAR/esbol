import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from 'src/app/models/docente.model';
import { DocenteService } from '../../services/docente/docente.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import Swal from 'sweetalert2';
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from '../../services/clase/clase.service';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styles: []
})
export class HorarioComponent implements OnInit {

  docente: Docente = new Docente('', '', '', '', '', '', '', '', '', '');

  clases: Clase[] = []
  clase: Clase = new Clase('', '', '');

  @ViewChild('calendario', null) calendarComponent: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [{ id: '0', title: 'Event Now', start: '2019-11-06T10:00:00', end:'2019-11-06T12:00:00' }];
  
  constructor(
    public _docenteService: DocenteService,
    public _claseService: ClaseService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id != 'nuevo') {
        this.cargarDocente(id);
      }
    });
  }


  ngOnInit() {
  }


  cargarDocente(id: string) {
    this._docenteService.obtenerDocente(id)
      .subscribe(docente => {
        this.docente = docente;
        console.log(docente);
      });
  }


  crearClase(asignatura: string, horaInicio: string, horaFin: string) {
    this.clase.asignatura = asignatura;
    this.clase.horaInicio = horaInicio;
    this.clase.horaFin = horaFin;

    return this._claseService.crearClase(this.clase);
      /* .subscribe(clase => {
        this.clase = clase;
      }); */
  }


  actualizarClase(id: string, horaInicio: string, horaFin: string) {
    this.clase._id = id;
    this.clase.horaInicio = horaInicio;
    this.clase.horaFin = horaFin;

    //console.log(this.clase._id);
    /* this._claseService.guardarClase(this.clase)
      .subscribe(clase => {
        console.log(clase);
      }); */
  }
  

  selectDate(info) {
    let opciones = {};
    let ids: string;
    let names: string;

    for(let i in this.docente.asignaturas) {
      ids = this.docente.asignaturas[i].nombre;
      names = this.docente.asignaturas[i].nombre;
      opciones[ids] = names;
    }

    Swal.fire({
      title: 'Nueva Clase',
      input: 'select',
      inputOptions: opciones,
      inputPlaceholder: 'Selecciona una Asignatura',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if(!value){
            resolve('Debes seleccionar una Asignatura')
          } else {
            let nuevaClase = this.crearClase(value, info.startStr, info.endStr);
            nuevaClase.subscribe(clase => {
              this.calendarComponent.getApi().addEvent({
                id: clase._id,
                title: value,
                start: info.startStr,
                end: info.endStr
              });
            });
            resolve();
          }
        });
      }
    });
  }


  updateDate(info) {
    Swal.fire({
      title: 'Cambiar duración',
      text: info.event.title + " terminará ahora a las " + this.mostrarHora(info.event.end),
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Cancelar"
    }).then((cambiar) => {
      if(cambiar.value) {
        let evento = this.calendarComponent.getApi().getEventById(info.event.id);
        evento.setStart(info.event.start);
        evento.setEnd(info.event.end);

        //this.actualizarClase(info.event.start, info.event.end);
      } else {
        info.revert();
      }
    });
  }


  dropEvent(info) {
    let evento = this.calendarComponent.getApi().getEventById(info.event.id);
    evento.setStart(info.event.start);
    evento.setEnd(info.event.end);

    this.actualizarClase(info.event.id, info.event.start, info.event.end);
  }


  clickEvent(info) {
    Swal.fire({
      title: 'Borrar Clase',
      text: '¿Deseas borrar la clase de ' + info.event.title + '?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: "Cancelar"
    }).then((eliminar) => {
      if(eliminar.value) {
        this._claseService.eliminarClase(info.event.id)
          .subscribe(() => {
            Swal.fire('Clase Eliminada', 'success');
          });
        info.event.remove();
      }
    });
  }

  
  renderEvents(info) {
    let f = info.event.end - info.event.start;
    let horas = Math.floor((f % 86400000)/3600000);
    let minutos = Math.round(((f % 86400000) % 3600000) / 60000);
    
    if(minutos > 0) {
      info.el.title = horas + " hora(s) y " + minutos + " minutos";
    } else {
      info.el.title = horas + " hora(s)";
    }
  }


  aumentarHora(fecha: Date) {
    return new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), fecha.getHours()+6.5));
  }


  mostrarHora(fecha: Date) {
    let horas: any = fecha.getHours();
    let minutos: any = fecha.getMinutes();
    if (horas < 10) {
      horas = "0" + horas;
    }
    if(minutos < 10) {
      minutos = "0" + minutos;
    }
    return horas + ":" + minutos;
  }


  eventos() {
    //console.log(this.calendarComponent.getApi().getEvents());
    console.log(this.docente.asignaturas[0]._id);
  }

}