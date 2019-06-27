import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { EstudianteEdicionComponent } from './pages/estudiante/estudiante-edicion/estudiante-edicion.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { ApoderadoEdicionComponent } from './pages/apoderado/apoderado-edicion/apoderado-edicion.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { ProfesorEdicionComponent } from './pages/profesor/profesor-edicion/profesor-edicion.component';
import { CursoComponent } from './pages/curso/curso.component';
import { CursoEdicionComponent } from './pages/curso/curso-edicion/curso-edicion.component';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { AsistenciaEdicionComponent } from './pages/asistencia/asistencia-edicion/asistencia-edicion.component';

const routes: Routes = [

  {
    path: 'estudiante', component: EstudianteComponent, children: [
      { path: 'nuevo', component: EstudianteEdicionComponent },
      { path: 'edicion/:id', component: EstudianteEdicionComponent }
    ]
  },
  {
    path: 'apoderado', component: ApoderadoComponent, children: [
      { path: 'nuevo', component: ApoderadoEdicionComponent },
      { path: 'edicion/:id', component: ApoderadoEdicionComponent }
    ]
  },
  {
    path: 'profesor', component: ProfesorComponent, children: [
      { path: 'nuevo', component: ProfesorEdicionComponent },
      { path: 'edicion/:id', component: ProfesorEdicionComponent }
    ]
  },
  {
    path: 'curso', component: CursoComponent, children: [
      { path: 'nuevo', component: CursoEdicionComponent },
      { path: 'edicion/:id', component: CursoEdicionComponent }
    ]
  },
  {
    path: 'asistencia', component: AsistenciaComponent, children: [
      { path: 'nuevo', component: AsistenciaEdicionComponent },
      { path: 'edicion/:id', component: AsistenciaEdicionComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
