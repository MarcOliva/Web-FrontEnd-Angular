import { Injectable } from '@angular/core';
import { HOST } from '@angular/core/src/render3/interfaces/view';
import { Subject } from 'rxjs';
import { Course } from '../_model/curso';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CursoService {
    url: string = `${HOST}/cursos`;
    cursosCambio = new Subject<Course[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Course[]>(this.url);
    }

    listarCursoPorId(id: number) {
        return this.http.get<Course>(`${this.url}/${id}`);
    }

    registrar(curso: Course) {
        return this.http.post(this.url, curso);
    }

    modificar(curso: Course) {
        return this.http.put(this.url, curso);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}