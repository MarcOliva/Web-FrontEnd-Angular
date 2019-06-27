import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { Course } from 'src/app/_model/curso';
import { CourseService } from 'src/app/_service/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  dataSource: MatTableDataSource<Course>;
  displayedColumns = ['idCurso', 'nombre', 'nivelEducativo'];
  constructor(private cursoService: CourseService, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.cursoService.cursoCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.cursoService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.cursoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  eliminar(idProfesor: number) {
    this.cursoService.eliminar(idProfesor).subscribe(data => {
      this.cursoService.listar().subscribe(data => {
        this.cursoService.cursoCambio.next(data);
        this.cursoService.mensaje.next('Se eliminó');
      });
    });
  }
}
