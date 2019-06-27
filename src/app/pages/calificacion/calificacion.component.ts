import { Component, OnInit } from '@angular/core';
import { CalificacionService } from 'src/app/_service/calificacion.service';
import { Qualification } from 'src/app/_model/calificacion';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {

  dataSource: MatTableDataSource<Qualification>;
  displayedColumns=['idCalificacion','tipo','nota','curso','profesor','estudiante'];
  constructor(private calificacionService: CalificacionService) { }

  ngOnInit() {
    this.calificacionService.calificacionCambio.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });

    this.calificacionService.listar().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }

  eliminar(idCalificacion: number) {
    this.calificacionService.eliminar(idCalificacion).subscribe(data => {
      this.calificacionService.listar().subscribe(data => {
        this.calificacionService.calificacionCambio.next(data);
        this.calificacionService.mensaje.next('Se eliminó');
      });
    });
  }
}
