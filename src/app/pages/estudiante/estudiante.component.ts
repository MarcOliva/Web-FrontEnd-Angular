import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Student } from 'src/app/_model/estudiante';
import { EstudianteService } from 'src/app/_service/estudiante.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  displayedColumns = ['idEstudiante', 'name', 'paternalLastname', 'maternalLastname', 'dni', 'acciones'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private estudianteService: EstudianteService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.estudianteService.estudiantesCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.estudianteService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.estudianteService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  eliminar(idEstudiante: number) {
    this.estudianteService.eliminar(idEstudiante).subscribe(data => {
      this.estudianteService.listar().subscribe(data => {
        this.estudianteService.estudiantesCambio.next(data);
        this.estudianteService.mensaje.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.estudianteService.listar().subscribe(data => {
      console.log(data);
      let estudiantes = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(estudiantes);
      this.dataSource.sort = this.sort;
    });
  }

}
