import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Student } from 'src/app/_model/estudiante';
import { EstudianteService } from 'src/app/_service/estudiante.service';
import { ApoderadoService } from 'src/app/_service/apoderado.service';
import { NivelEducativoService } from 'src/app/_service/nivelEducativo.service';
import { Empowered } from 'src/app/_model/apoderado';
import { EducationDegree } from 'src/app/_model/nivelEducativo';


@Component({
  selector: 'app-estudiante-edicion',
  templateUrl: './estudiante-edicion.component.html',
  styleUrls: ['./estudiante-edicion.component.css']
})
export class EstudianteEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  selectedApoderado: number;
  selectedNivel: number;
  selectedApoderadoText: string;
  selectedNivelText: string;

  estudiante: Student;
  apoderados: Empowered[];
  nivelesEducativos: EducationDegree[];
  constructor(private route: ActivatedRoute, private router: Router,
    private estudianteService: EstudianteService, private apoderadoService: ApoderadoService, private nivelesEducativosService: NivelEducativoService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(''),
      'paternalLastname': new FormControl(''),
      'maternalLastname': new FormControl(''),
      'dni': new FormControl(''),
      'empowered': new FormControl(''),
      'educationDegree': new FormControl('')
    });
    this.apoderadoService.listar().subscribe((data) => {
      this.apoderados = data;
      console.log(this.apoderados)
    })

    this.nivelesEducativosService.listar().subscribe((data) => {
      this.nivelesEducativos = data;
      console.log(this.nivelesEducativos)
    })
  }

  ngOnInit() {
    this.estudiante = new Student();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.estudianteService.listarEstudiantePorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'name': new FormControl(data.name),
          'paternalLastname': new FormControl(data.paternalLastname),
          'maternalLastname': new FormControl(data.maternalLastname),
          'dni': new FormControl(data.dni),
        });
        this.selectedApoderado = data.empowered.id;
        this.selectedNivel = data.educationDegree.id;

        this.selectedApoderadoText = data.empowered.name + " " + data.empowered.paternalLastname;
        this.selectedNivelText = data.educationDegree.grade;

      });


    }
  }

  operar() {
    console.log(this.selectedApoderado);
    console.log(this.selectedNivel)
    let empowered = new Empowered();
    empowered.id = this.selectedApoderado;
    let nivel = new EducationDegree();
    nivel.id = this.selectedNivel;
    this.estudiante.id = this.form.value['id'];
    this.estudiante.name = this.form.value['name'];
    this.estudiante.paternalLastname = this.form.value['paternalLastname'];
    this.estudiante.maternalLastname = this.form.value['maternalLastname'];
    this.estudiante.dni = this.form.value['dni'];
    this.estudiante.empowered = empowered;
    this.estudiante.educationDegree = nivel;

    if (this.edicion) {
      this.selectedApoderado = this.estudiante.empowered.id;
      this.selectedNivel = this.estudiante.educationDegree.id;

      this.selectedApoderadoText = this.estudiante.empowered.name + " " + this.estudiante.empowered.paternalLastname;
      this.selectedNivelText = this.estudiante.educationDegree.grade;

      this.estudianteService.modificar(this.estudiante).subscribe(
        data => {
          this.estudianteService.listar().subscribe(estudiantes => {
            this.estudianteService.estudiantesCambio.next(estudiantes);
            this.estudianteService.mensaje.next('Se modificó');
          })
        }
      );

    } else {

      this.estudianteService.registrar(this.estudiante).subscribe(
        data => {
          this.estudianteService.listar().subscribe(estudiantes => {
            this.estudianteService.estudiantesCambio.next(estudiantes);
            this.estudianteService.mensaje.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['estudiante']);
  }

}
