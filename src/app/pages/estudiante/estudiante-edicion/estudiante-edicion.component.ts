import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Student } from 'src/app/_model/estudiante';
import { EstudianteService } from 'src/app/_service/estudiante.service';

@Component({
  selector: 'app-estudiante-edicion',
  templateUrl: './estudiante-edicion.component.html',
  styleUrls: ['./estudiante-edicion.component.css']
})
export class EstudianteEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  estudiante: Student;
  constructor(private route: ActivatedRoute, private router: Router,
    private estudianteService: EstudianteService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(''),
      'paternalLastname': new FormControl(''),
      'maternalLastname': new FormControl(''),
      'dni': new FormControl(''),
      'empowered': new FormControl(''),
      'educationDegree': new FormControl('')
    });
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
          'empowered': new FormControl(data.empowered),
          'educationDegree': new FormControl(data.educationDegree),
        });
      });
    }
  }

  operar() {
    this.estudiante.id = this.form.value['id'];
    this.estudiante.name = this.form.value['name'];
    this.estudiante.paternalLastname = this.form.value['paternalLastname'];
    this.estudiante.maternalLastname = this.form.value['maternalLastname'];
    this.estudiante.dni = this.form.value['dni'];
    this.estudiante.empowered = this.form.value['empowered'];
    this.estudiante.educationDegree = this.form.value['educationDegree'];

    if (this.edicion) {
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
