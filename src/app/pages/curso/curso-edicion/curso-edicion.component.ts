import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Course } from 'src/app/_model/curso';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CourseService } from 'src/app/_service/curso.service';
import { EducationDegree } from 'src/app/_model/nivelEducativo';
import { NivelEducativoService } from 'src/app/_service/nivelEducativo.service';

@Component({
  selector: 'app-curso-edicion',
  templateUrl: './curso-edicion.component.html',
  styleUrls: ['./curso-edicion.component.css']
})
export class CursoEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  curso: Course;
  edicion: boolean = false;

  selectedNivel: number;
  selectedNivelText: string;
  nivelesEducativos: EducationDegree[];
  constructor(private route: ActivatedRoute, private router: Router,
    private cursoService: CourseService, private nivelesEducativosService: NivelEducativoService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'nivelEducativo': new FormControl(''),
    });
    this.nivelesEducativosService.listar().subscribe((data) => {
      this.nivelesEducativos = data;
      console.log(this.nivelesEducativos)
    })
  }

  ngOnInit() {
    this.curso = new Course();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.cursoService.listarcursoPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'nombre': new FormControl(data.name),
        });
        this.selectedNivel = data.educationLevel.id;
        this.selectedNivelText = data.educationLevel.grade;

      });
    }
  }


  operar() {
    let nivel = new EducationDegree();
    nivel.id = this.selectedNivel;
    this.curso.id = this.form.value['id'];
    this.curso.name = this.form.value['nombre'];
    this.curso.educationLevel = nivel;

    console.log(this.curso)
    if (this.edicion) {
      this.selectedNivel = this.curso.educationLevel.id;
      this.selectedNivelText = this.curso.educationLevel.grade;
      this.cursoService.modificar(this.curso).subscribe(
        data => {
          this.cursoService.listar().subscribe(cursos => {
            this.cursoService.cursoCambio.next(cursos);
          })
        }
      );

    } else {
      console.log(this.curso)
      this.cursoService.registrar(this.curso).subscribe(
        data => {
          this.cursoService.listar().subscribe(cursos => {
            this.cursoService.cursoCambio.next(cursos);
            this.cursoService.mensaje.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['curso']);
  }
}
