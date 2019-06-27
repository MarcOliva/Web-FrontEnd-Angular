import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Teacher } from '../_model/profesor';


@Injectable({
    providedIn: 'root'
})
export class ProfesorService {
    url: string = `${HOST}/profesores`;
    profesoresCambio = new Subject<Teacher[]>();
    mensaje = new Subject<string>();

    constructor(private http: HttpClient) { }

    listar() {
        return this.http.get<Teacher[]>(this.url);
    }

    listarProfesorPorId(id: number) {
        return this.http.get<Teacher>(`${this.url}/${id}`);
    }

    registrar(profesor: Teacher) {
        return this.http.post(this.url, profesor);
    }

    modificar(profesor: Teacher) {
        return this.http.put(this.url, profesor);
    }

    eliminar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }
}