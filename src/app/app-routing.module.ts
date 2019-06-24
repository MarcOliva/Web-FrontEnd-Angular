import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { EstudianteEdicionComponent } from './pages/estudiante/estudiante-edicion/estudiante-edicion.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { ApoderadoEdicionComponent } from './pages/apoderado/apoderado-edicion/apoderado-edicion.component';
import { CursoComponent } from './pages/curso/curso.component';
import { CursoEdicionComponent } from './pages/curso/curso-edicion/curso-edicion.component';

const routes: Routes = [

  {
    path: 'student', component: EstudianteComponent, children: [
      { path: 'nuevo', component: EstudianteEdicionComponent },
      { path: 'edicion/:id', component: EstudianteEdicionComponent }
    ]
  },
  {
    path: 'empowered', component: ApoderadoComponent, children: [
      { path: 'nuevo', component: ApoderadoEdicionComponent },
      { path: 'edicion/:id', component: ApoderadoEdicionComponent }
    ]
  },
  {
    path: 'course', component: CursoComponent, children: [
      { path: 'nuevo', component: CursoEdicionComponent },
      { path: 'edicion/:id', component: CursoEdicionComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
