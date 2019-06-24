import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Course } from 'src/app/_model/curso';
import { CourseService } from 'src/app/_service/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  dataSource: MatTableDataSource<Course>;
  displayedColumns=['idCurso','nombre','nivelEducativo'];
  constructor(private cursoService: CourseService) { }

  ngOnInit() {
    this.cursoService.cursoCambio.subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });

    this.cursoService.listar().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
    });
  }

  applyFilter(filterValue: string){
    filterValue=filterValue.trim();
    filterValue=filterValue.toLowerCase();
    this.dataSource.filter=filterValue;
  }
}
