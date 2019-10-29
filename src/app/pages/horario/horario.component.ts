import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Asignatura } from 'src/app/models/asignatura.model';
import { AsignaturaService } from '../../services/service.index';
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from '../../services/clase/clase.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styles: []
})
export class HorarioComponent implements OnInit {
  
  asignaturas: Asignatura[] = [];
  asignatura: Asignatura = new Asignatura('', '', '', '', '');

  clases: Clase[] = [];
  clase: Clase = new Clase('', '', '');

  @ViewChild('calendario', null) calendarComponent: FullCalendarComponent;
  //@ViewChild('externos', null) externos: ElementRef;

  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [{ id: '0', title: 'Event Now', start: '2019-10-22T07:00:00', end:'2019-10-22T08:00:00' }];
  
  constructor(
    public _asignaturaService: AsignaturaService,
    public _claseService: ClaseService
  ) { }


  ngOnInit() {
    this.cargarAsignaturas();
  }

  /* ngAfterViewInit() {
    new Draggable(this.externos.nativeElement, {
      itemSelector: '.fc-event'
  });
  } */


  cargarAsignaturas() {
    this._asignaturaService.cargarAsignaturas()
      .subscribe(asignaturas => this.asignaturas = asignaturas);
  }
  

  selectDate(info) {
    let titulo = this.calendarEvents.length;

    let opciones = {};
    let ids: string;
    let names: string;

    for(let i in this.asignaturas) {
      ids = this.asignaturas[i]._id;
      names = this.asignaturas[i].nombre;
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
            this.calendarEvents = this.calendarEvents.concat({
              id: titulo + '',
              title: value,
              start: info.startStr,
              end: info.endStr
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
        this.calendarComponent.events[info.event.id] = {
          id: info.event.id,
          title: info.event.title,
          start: info.event.start,
          end: info.event.end
        };
      } else {
        info.revert();
      }
    });
  }


  dropEvent(info) {
    this.calendarComponent.events[info.event.id] = { 
      id: info.event.id, 
      title: info.event.title,
      start: info.event.start,
      end:info.event.end
    };
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
        console.log(eliminar.value);
        this.calendarEvents.splice(info.event.id, 1);
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
    console.log(this.calendarEvents);
  }


  /* dropExternalEvent(info) {
    let titulo = this.calendarEvents.length;
    this.calendarEvents = this.calendarEvents.concat({
      id: titulo + '',
      title: info.draggedEl.innerText,
      start: info.date,
      end: this.aumentarHora(info.date)
    });
  } */


  /* async clickEvent(info) {
    const { value: ipAddress } = await Swal.fire({
      title: 'Enter your IP address',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })
    
    if (ipAddress) {
      this.calendarComponent.events[info.events.id] = {
        id: info.event.id,
        title: ipAddress,
        start: info.event.start,
        end:info.event.end 
      };
      info.event.setProp('title', ipAddress);
    }
  } */

}