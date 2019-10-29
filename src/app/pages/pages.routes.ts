import { LoginGuardGuard } from '../services/service.index';
import { Routes, RouterModule } from '@angular/router';

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


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'admin', component: AdminComponent, data: { titulo: 'Admin' } },
            { path: 'horario', component: HorarioComponent, data: { titulo: 'Horario' } },
            { path: 'docentes', component: DocentesComponent, data: { titulo: 'Docentes' } },
            { path: 'docente/:id', component: DocenteComponent, data: { titulo: 'Docente' } },
            { path: 'estudiantes', component: EstudiantesComponent, data: { titulo: 'Estudiantes' } },
            { path: 'estudiante/:id', component: EstudianteComponent, data: { titulo: 'Estudiante' } },
            { path: 'materias', component: MateriasComponent, data: { titulo: 'Asignaturas' } },
            { path: 'clase', component: ClaseComponent, data: { titulo: 'Clase' } },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );