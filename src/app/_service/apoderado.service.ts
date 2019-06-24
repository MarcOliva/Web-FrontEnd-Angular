import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Empowered } from '../_model/apoderado';

@Injectable({
    providedIn: 'root'
})
export class ApoderadoService {

    url: string = `${HOST}apoderados`;
    apoderadosCambio = new Subject<Empowered[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Empowered[]>(this.url);
    }

    listarApoderadoPorId(id: number) {
        return this.http.get<Empowered>(`${this.url}/${id}`);
    }
    listarPageable(p: number, s: number) {
        return this.http.get<Empowered[]>(`${this.url}/pageable?page=${p}&size=${s}`);
    }

    registrar(apoderado: Empowered) {
        return this.http.post(this.url, apoderado);
    }

    modificar(apoderado: Empowered) {
        return this.http.put(this.url, apoderado);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}