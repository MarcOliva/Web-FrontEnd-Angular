import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Teacher } from 'src/app/_model/profesor';
import { ProfesorService } from 'src/app/_service/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  displayedColumns = ['idProfesor', 'name', 'paternalLastname', 'maternalLastname', 'phone', 'educationDegree', 'acciones'];
  dataSource: MatTableDataSource<Teacher>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private profesorService: ProfesorService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.profesorService.profesoresCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.profesorService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.profesorService.listar().subscribe(data => {
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
  eliminar(idProfesor: number) {
    this.profesorService.eliminar(idProfesor).subscribe(data => {
      this.profesorService.listar().subscribe(data => {
        this.profesorService.profesoresCambio.next(data);
        this.profesorService.mensaje.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.profesorService.listar().subscribe(data => {
      console.log(data);
      let profesores = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(profesores);
      this.dataSource.sort = this.sort;
    });
  }

}
