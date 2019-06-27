import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Empowered } from 'src/app/_model/apoderado';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApoderadoService } from 'src/app/_service/apoderado.service';

@Component({
  selector: 'app-apoderado-edicion',
  templateUrl: './apoderado-edicion.component.html',
  styleUrls: ['./apoderado-edicion.component.css']
})
export class ApoderadoEdicionComponent implements OnInit {

  id: number;
  form: FormGroup;
  edicion: boolean = false;
  apoderado: Empowered;
  constructor(private route: ActivatedRoute, private router: Router,
    private apoderadoService: ApoderadoService) {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'name': new FormControl(''),
      'paternalLastname': new FormControl(''),
      'maternalLastname': new FormControl(''),
      'email': new FormControl(''),
      'dni': new FormControl(''),
      'phone': new FormControl(''),
      'birthdate': new FormControl('')
    });
  }

  ngOnInit() {
    this.apoderado = new Empowered();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.apoderadoService.listarApoderadoPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.id),
          'name': new FormControl(data.name),
          'paternalLastname': new FormControl(data.paternalLastname),
          'maternalLastname': new FormControl(data.maternalLastname),
          'email': new FormControl(data.email),
          'dni': new FormControl(data.dni),
          'phone': new FormControl(data.phone),
          'birthdate': new FormControl(data.birthdate),
        });
      });
    }
  }

  operar() {
    this.apoderado.id = this.form.value['id'];
    this.apoderado.name = this.form.value['name'];
    this.apoderado.paternalLastname = this.form.value['paternalLastname'];
    this.apoderado.maternalLastname = this.form.value['maternalLastname'];
    this.apoderado.email = this.form.value['email'];
    this.apoderado.dni = this.form.value['dni'];
    this.apoderado.phone = this.form.value['phone'];
    this.apoderado.birthdate = this.form.value['birthdate'];

    if (this.edicion) {
      this.apoderadoService.modificar(this.apoderado).subscribe(
        data => {
          this.apoderadoService.listar().subscribe(apoderados => {
            this.apoderadoService.apoderadosCambio.next(apoderados);
            this.apoderadoService.mensaje.next('Se modificó');
          })
        }
      );

    } else {

      this.apoderadoService.registrar(this.apoderado).subscribe(
        data => {
          this.apoderadoService.listar().subscribe(apoderados => {
            this.apoderadoService.apoderadosCambio.next(apoderados);
            this.apoderadoService.mensaje.next('Se registró');
          })
        }
      );
    }
    this.router.navigate(['apoderado']);
  }

}
