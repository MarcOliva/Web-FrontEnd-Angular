import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Qualification } from '../_model/calificacion';

@Injectable({
    providedIn: 'root'
})
export class CalificacionService {
    url: string = `${HOST}/calificaciones`;
    calificacionCambio = new Subject<Qualification[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Qualification[]>(this.url);
    }

    listarCalificacionPorId(id: number) {
        return this.http.get<Qualification>(`${this.url}/${id}`);
    }

    registrar(calificacion: Qualification) {
        return this.http.post(this.url, calificacion);
    }

    modificar(calificacion: Qualification) {
        return this.http.put(this.url, calificacion);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}