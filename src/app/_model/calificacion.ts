import { Course } from './curso';
import { Student } from './estudiante';
import { Teacher } from './profesor';

export class Qualification {
    public id: number;
    public type: string;
    public score: DoubleRange;
    public course: Course;
    public teacher: Teacher;
    public student: Student;
}