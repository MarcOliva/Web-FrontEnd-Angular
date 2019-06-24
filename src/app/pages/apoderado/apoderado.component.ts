import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Empowered } from 'src/app/_model/apoderado';
import { ApoderadoService } from 'src/app/_service/apoderado.service';

@Component({
  selector: 'app-apoderado',
  templateUrl: './apoderado.component.html',
  styleUrls: ['./apoderado.component.css']
})
export class ApoderadoComponent implements OnInit {

  displayedColumns = ['idApoderado', 'name', 'paternalLastname', 'maternalLastname', 'phone', 'acciones'];
  dataSource: MatTableDataSource<Empowered>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;

  constructor(private apoderadoService: ApoderadoService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.apoderadoService.apoderadosCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.apoderadoService.mensaje.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

    this.apoderadoService.listar().subscribe(data => {
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
  eliminar(idApoderado: number) {
    this.apoderadoService.eliminar(idApoderado).subscribe(data => {
      this.apoderadoService.listar().subscribe(data => {
        this.apoderadoService.apoderadosCambio.next(data);
        this.apoderadoService.mensaje.next('Se eliminó');
      });
    });
  }

  mostrarMas(e: any) {
    console.log(e);
    this.apoderadoService.listar().subscribe(data => {
      console.log(data);
      let apoderados = JSON.parse(JSON.stringify(data)).content;
      this.cantidad = JSON.parse(JSON.stringify(data)).totalElements;

      this.dataSource = new MatTableDataSource(apoderados);
      this.dataSource.sort = this.sort;
    });
  }


}
