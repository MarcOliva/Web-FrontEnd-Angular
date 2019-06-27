import { EducationDegree } from './nivelEducativo';

export class Teacher {
    public id: number;
    public name: string;
    public paternalLastname: string;
    public maternalLastname: string;
    public email: string;
    public dni: number;
    public phone: number;
    public educationDegree: EducationDegree;
}