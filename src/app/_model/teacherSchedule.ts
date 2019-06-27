import { Course } from './curso';
import { EducationDegree } from './nivelEducativo';
import { Teacher } from './profesor';

export class TeacherSchedule {
    public id: number;
    public startTime: string;
    public endTime: string;
    public day: string;
    public course: Course;
    public educationDegree: EducationDegree;
    public teacher: Teacher;
}