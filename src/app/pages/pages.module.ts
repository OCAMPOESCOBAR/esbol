import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.route';

import { SharedModule } from '../shared/shared.module'; 

import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AdminComponent } from './admin/admin.component';

import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { HorarioComponent } from './horario/horario.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { MateriasComponent } from './materias/materias.component';
import { ClaseComponent } from './clase/clase.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        AdminComponent,
        IncrementadorComponent,
        HorarioComponent,
        ProfesoresComponent,
        EstudiantesComponent,
        MateriasComponent,
        ClaseComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        AdminComponent,
        IncrementadorComponent,
        HorarioComponent,
        ProfesoresComponent,
        EstudiantesComponent,
        MateriasComponent,
        ClaseComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})

export class PagesModule { }
