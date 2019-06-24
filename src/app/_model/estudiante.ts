import { Empowered } from './apoderado';
import { EducationDegree } from './nivelEducativo';

export class Estudiante {
    public id: number;
    public name: string;
    public paternalLastname: string;
    public maternalLastname: string;
    public dni: number;
    public empowered: Empowered;
    public educationDegree: EducationDegree;

}