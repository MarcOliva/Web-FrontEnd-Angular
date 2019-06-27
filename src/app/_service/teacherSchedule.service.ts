import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Teacher } from '../_model/profesor';
import { TeacherSchedule } from '../_model/teacherSchedule';

@Injectable({
    providedIn: 'root'
})
export class ProfesorHorarioService {

    url: string = `${HOST}profe/horario`;
    profesoresCambio = new Subject<TeacherSchedule[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<TeacherSchedule[]>(this.url);
    }

    listarHorariosPorIdProfe(id: number) {
        return this.http.get<TeacherSchedule[]>(`${this.url}/${id}`);
    }

    registrar(profesor: TeacherSchedule) {
        return this.http.post(this.url, profesor);
    }

    modificar(profesor: TeacherSchedule) {
        return this.http.put(this.url, profesor);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}