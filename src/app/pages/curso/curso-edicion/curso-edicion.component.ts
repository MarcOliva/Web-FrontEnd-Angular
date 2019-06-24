import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Course } from 'src/app/_model/curso';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/_service/curso.service';

@Component({
  selector: 'app-curso-edicion',
  templateUrl: './curso-edicion.component.html',
  styleUrls: ['./curso-edicion.component.css']
})
export class CursoEdicionComponent implements OnInit {

  form: FormGroup;
  curso: Course;
  edicion=false;

  constructor(private route: ActivatedRoute, private router:Router,
    private cursoService: CourseService) {
      this.form=new FormGroup({
        'id':new FormControl(0),
        'nombre':new FormControl(''),
        'nivelEducativo':new FormControl(''),
      });
     }

  ngOnInit() {
    this.curso=new Course();
  }

  operar(){
    this.curso.id=this.form.value['id'];
    this.curso.name=this.form.value['nombre'];
    this.curso.educationLevel=this.form.value['nivelEducativo'];

    if(this.edicion){
      this.cursoService.modificar(this.curso).subscribe(
        data=>{
          this.cursoService.listar().subscribe(cursos =>{
            this.cursoService.cursoCambio.next(cursos);
          })
        }
      );

    }else{
      this.cursoService.registrar(this.curso).subscribe(
        data=>{
          this.cursoService.listar().subscribe(cursos =>{
            this.cursoService.cursoCambio.next(cursos);
          })
        }
      );
    }
    this.router.navigate(['curso']);
  }
}
