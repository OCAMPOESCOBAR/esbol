import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module'; 

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';

import { HorarioComponent } from './horario/horario.component';
import { DocentesComponent } from './docentes/docentes.component';
import { DocenteComponent } from './docentes/docente.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { EstudianteComponent } from './estudiantes/estudiante.component';
import { MateriasComponent } from './materias/materias.component';
import { ClaseComponent } from './clase/clase.component';
import { ProfileComponent } from './profile/profile.component';

import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AdminComponent,
        HorarioComponent,
        DocentesComponent,
        DocenteComponent,
        EstudiantesComponent,
        EstudianteComponent,
        MateriasComponent,
        ClaseComponent,
        ProfileComponent
    ],
    exports: [
        DashboardComponent,
        AdminComponent,
        HorarioComponent,
        DocentesComponent,
        EstudiantesComponent,
        MateriasComponent,
        ClaseComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        FullCalendarModule,
    ]
})

export class PagesModule { }
