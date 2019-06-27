import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/_model/profesor';
import { EducationDegree } from 'src/app/_model/nivelEducativo';
import { Course } from 'src/app/_model/curso';
import { Student } from 'src/app/_model/estudiante';
import { ProfesorService } from 'src/app/_service/profesor.service';
import { NivelEducativoService } from 'src/app/_service/nivelEducativo.service';
import { CourseService } from 'src/app/_service/curso.service';
import { EstudianteService } from 'src/app/_service/estudiante.service';
import { ProfesorHorarioService } from 'src/app/_service/teacherSchedule.service';
import { TeacherSchedule } from 'src/app/_model/teacherSchedule';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {

  displayedColumns = ['idHorario', 'day', 'startTime', 'endTime', 'course', 'educationDegree', 'acciones'];
  dataSource: MatTableDataSource<TeacherSchedule>;

  selectedProfe: number;
  selectedNivel: number;
  selectedCurso: number;

  profesor: Teacher
  nivel: EducationDegree
  curso: Course
  alumno: Student

  profesores: Teacher[];
  niveles: EducationDegree[];
  cursos: Course[];
  alumnos: Student[];

  horarios: TeacherSchedule[];
  fechaActual = new Date();

  constructor(private profesorService: ProfesorService, private nivelesEducativosService: NivelEducativoService,
    private cursoService: CourseService, private alumnosService: EstudianteService, private scheduleService: ProfesorHorarioService) {

    this.profesorService.listar().subscribe((data) => {
      this.profesores = data;
      console.log(this.profesores)
    })
  }

  ngOnInit() {


  }
  mostrarHorarioProfesor() {
    if (this.selectedProfe != null) {
      this.scheduleService.listarHorariosPorIdProfe(this.selectedProfe).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
      })
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }




}
