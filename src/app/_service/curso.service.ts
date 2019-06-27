import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Course } from '../_model/curso';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    url: string = `${HOST}cursos`;
    cursoCambio = new Subject<Course[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Course[]>(this.url);
    }

    listarcursoPorId(id: number) {
        return this.http.get<Course>(`${this.url}/${id}`);
    }
    listarCursosPorNivel(id: number) {
        return this.http.get<Course>(`${this.url}/grado/${id}`);
    }


    registrar(course: Course) {
        return this.http.post(this.url, course);
    }

    modificar(course: Course) {
        return this.http.put(this.url, course);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
} 