import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { ApoderadoComponent } from './pages/apoderado/apoderado.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EstudianteEdicionComponent } from './pages/estudiante/estudiante-edicion/estudiante-edicion.component';
import { ApoderadoEdicionComponent } from './pages/apoderado/apoderado-edicion/apoderado-edicion.component';
import { NivelEducativoComponent } from './pages/nivel-educativo/nivel-educativo.component';
import { NivelEducativoEdicionComponent } from './pages/nivel-educativo/nivel-educativo-edicion/nivel-educativo-edicion.component';
import { CursoComponent } from './pages/curso/curso.component';
import { CursoEdicionComponent } from './pages/curso/curso-edicion/curso-edicion.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudianteComponent,
    ApoderadoComponent,
    EstudianteEdicionComponent,
    ApoderadoEdicionComponent,
    NivelEducativoComponent,
    NivelEducativoEdicionComponent,
    CursoComponent,
    CursoEdicionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
