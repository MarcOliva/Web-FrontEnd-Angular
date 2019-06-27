import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_model/curso';
import { Teacher } from 'src/app/_model/profesor';
import { Student } from 'src/app/_model/estudiante';
import { CalificacionService } from 'src/app/_service/calificacion.service';
import { CourseService } from 'src/app/_service/curso.service';
import { ProfesorService } from 'src/app/_service/profesor.service';
import { EstudianteService } from 'src/app/_service/estudiante.service';
import { Qualification } from 'src/app/_model/calificacion';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-calificacion-edicion',
  templateUrl: './calificacion-edicion.component.html',
  styleUrls: ['./calificacion-edicion.component.css']
})
export class CalificacionEdicionComponent implements OnInit {
  
  id: number;
  form: FormGroup;
  edicion = false;
  idCursoSeleccionado: number;
  idProfesorSeleccionado: number;
  idEstudianteSeleccionado: number;
  CursoSeleccionadoText: string;
  ProfesorSeleccionadoText: string;
  EstudianteSeleccionadoText: string;

  calificacion: Qualification;
  cursos: Course[] = [];
  profesores: Teacher[] = [];
  estudiantes: Student[] = [];
  tipos = ['PC1', 'PC2'];

  

  constructor(private route: ActivatedRoute, private router: Router,
    private calificacionService: CalificacionService, 
    private cursoService: CourseService,
    private profesorService: ProfesorService,
    private estudianteService: EstudianteService) { 
      this.form = new FormGroup({
        'id': new FormControl(0),
        'type': new FormControl(''),
        'score': new FormControl(''),
        'course': new FormControl(''),
        'teacher': new FormControl(''),
        'student': new FormControl('')
      });
      this.cursoService.listar().subscribe((data) => {
        this.cursos = data;
        console.log(this.cursos)
      })
      
      this.profesorService.listar().subscribe((data) => {
        this.profesores = data;
        console.log(this.profesores)
      })

      this.estudianteService.listar().subscribe((data) => {
        this.estudiantes = data;
        console.log(this.estudiantes)
      })
    }

  ngOnInit() {
    this.calificacion = new Qualification();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.calificacionService.listarCalificacionPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'type': new FormControl(data.type),
          'score': new FormControl(data.score)
        });
        this.idCursoSeleccionado = data.course.id;
        this.idProfesorSeleccionado = data.teacher.id;
        this.idEstudianteSeleccionado = data.student.id;

        this.CursoSeleccionadoText = data.course.name;
        this.ProfesorSeleccionadoText = data.teacher.name + " " + data.teacher.paternalLastname + " " + data.teacher.maternalLastname
        this.EstudianteSeleccionadoText = data.student.name + " " + data.student.paternalLastname + " " + data.student.maternalLastname
      });
    }
  }

  operar(){
    console.log(this.idCursoSeleccionado);
    console.log(this.idProfesorSeleccionado);
    console.log(this.idEstudianteSeleccionado);
    let curso = new Course();
    curso.id = this.idCursoSeleccionado;
    let profesor = new Teacher();
    profesor.id = this.idProfesorSeleccionado;
    let estudiante = new Student();
    estudiante.id = this.idEstudianteSeleccionado;
    this.calificacion.id = this.form.value['id'];
    this.calificacion.type = this.form.value['type'];
    this.calificacion.score = this.form.value['score'];
    this.calificacion.course = curso;
    this.calificacion.teacher = profesor;
    this.calificacion.student = estudiante;

    if (this.edicion) {
      this.idCursoSeleccionado = this.calificacion.course.id;
      this.idProfesorSeleccionado = this.calificacion.teacher.id;
      this.idEstudianteSeleccionado = this.calificacion.student.id;

      this.CursoSeleccionadoText = this.calificacion.course.name;
      this.ProfesorSeleccionadoText = this.calificacion.teacher.name + " " + this.calificacion.teacher.paternalLastname + " " + this.calificacion.teacher.maternalLastname;
      this.EstudianteSeleccionadoText = this.calificacion.student.name + " " + this.calificacion.student.paternalLastname + " " + this.calificacion.student.maternalLastname;

      this.calificacionService.modificar(this.calificacion).subscribe(
        data => {
          this.calificacionService.listar().subscribe(calificaciones => {
            this.calificacionService.calificacionCambio.next(calificaciones);
            this.calificacionService.mensaje.next('Se modificó');
          })
        }
      );

    } else {
      this.calificacionService.registrar(this.calificacion).subscribe(
        data => {
          this.calificacionService.listar().subscribe(calificaciones => {
            this.calificacionService.calificacionCambio.next(calificaciones);
            this.calificacionService.mensaje.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['qualification']);  
  }
}