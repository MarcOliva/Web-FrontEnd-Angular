import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { EstudianteEdicionComponent } from './pages/estudiante/estudiante-edicion/estudiante-edicion.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { ApoderadoEdicionComponent } from './pages/apoderado/apoderado-edicion/apoderado-edicion.component';

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
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
