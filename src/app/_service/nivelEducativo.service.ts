import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { EducationDegree } from '../_model/nivelEducativo';

@Injectable({
    providedIn: 'root'
})
export class NivelEducativo {
    url: string = `${HOST}/estudiantes`;
    nivelEduactivoCambio = new Subject<EducationDegree[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<EducationDegree[]>(this.url);
    }

    listarNivelesPorId(id: number) {
        return this.http.get<EducationDegree>(`${this.url}/${id}`);
    }

    registrar(estudiante: EducationDegree) {
        return this.http.post(this.url, estudiante);
    }

    modificar(estudiante: EducationDegree) {
        return this.http.put(this.url, estudiante);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}