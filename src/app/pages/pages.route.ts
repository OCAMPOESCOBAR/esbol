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
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'admin', component: AdminComponent },
            { path: 'horario', component: HorarioComponent },
            { path: 'profesores', component: ProfesoresComponent },
            { path: 'estudiantes', component: EstudiantesComponent },
            { path: 'materias', component: MateriasComponent },
            { path: 'clase', component: ClaseComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );