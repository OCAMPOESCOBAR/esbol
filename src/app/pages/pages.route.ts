import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AdminComponent } from './admin/admin.component';
import { HorarioComponent } from './horario/horario.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { MateriasComponent } from './materias/materias.component';
import { ClaseComponent } from './clase/clase.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas' } },
            { path: 'admin', component: AdminComponent, data: { titulo: 'Admin' } },
            { path: 'horario', component: HorarioComponent, data: { titulo: 'Horario' } },
            { path: 'profesores', component: ProfesoresComponent, data: { titulo: 'Profesores' } },
            { path: 'estudiantes', component: EstudiantesComponent, data: { titulo: 'Estudiantes' } },
            { path: 'materias', component: MateriasComponent, data: { titulo: 'Materias' } },
            { path: 'clase', component: ClaseComponent, data: { titulo: 'Clase' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );