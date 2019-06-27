import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Student } from '../_model/estudiante';
@Injectable({
    providedIn: 'root'
})
export class EstudianteService {

    url: string = `${HOST}alumnos`;
    estudiantesCambio = new Subject<Student[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Student[]>(this.url);
    }

    listarEstudiantePorId(id: number) {
        return this.http.get<Student>(`${this.url}/${id}`);
    }

    registrar(estudiante: Student) {
        return this.http.post(this.url, estudiante);
    }

    modificar(estudiante: Student) {
        return this.http.put(this.url, estudiante);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}