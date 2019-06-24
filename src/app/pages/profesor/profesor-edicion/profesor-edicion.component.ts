import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Teacher } from 'src/app/_model/profesor';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProfesorService } from 'src/app/_service/profesor.service';

@Component({
  selector: 'app-profesor-edicion',
  templateUrl: './profesor-edicion.component.html',
  styleUrls: ['./profesor-edicion.component.css']
})
export class ProfesorEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  profesor: Teacher;
  constructor(private route: ActivatedRoute, private router: Router,
    private profesorService: ProfesorService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(''),
      'paternalLastname': new FormControl(''),
      'maternalLastname': new FormControl(''),
      'email': new FormControl(''),
      'dni': new FormControl(''),
      'phone': new FormControl(''),
      'educationDegree': new FormControl('')
    });
  }

  ngOnInit() {
    this.profesor = new Teacher();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.profesorService.listarProfesorPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'name': new FormControl(data.name),
          'paternalLastname': new FormControl(data.paternalLastname),
          'maternalLastname': new FormControl(data.maternalLastname),
          'email': new FormControl(data.email),
          'dni': new FormControl(data.dni),
          'phone': new FormControl(data.phone),
          'educationDegree': new FormControl(data.educationDegree),
        });
      });
    }
  }

  operar() {
    this.profesor.id = this.form.value['id'];
    this.profesor.name = this.form.value['name'];
    this.profesor.paternalLastname = this.form.value['paternalLastname'];
    this.profesor.maternalLastname = this.form.value['maternalLastname'];
    this.profesor.email = this.form.value['email'];
    this.profesor.dni = this.form.value['dni'];
    this.profesor.phone = this.form.value['phone'];
    this.profesor.educationDegree = this.form.value['educationDegree'];

    if (this.edicion) {
      this.profesorService.modificar(this.profesor).subscribe(
        data => {
          this.profesorService.listar().subscribe(profesors => {
            this.profesorService.profesoresCambio.next(profesors);
            this.profesorService.mensaje.next('Se modificó');
          })
        }
      );

    } else {

      this.profesorService.registrar(this.profesor).subscribe(
        data => {
          this.profesorService.listar().subscribe(profesors => {
            this.profesorService.profesoresCambio.next(profesors);
            this.profesorService.mensaje.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['profesor']);
  }
}
