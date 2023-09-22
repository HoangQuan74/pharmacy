import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentLearnIntern } from "./StudentLearnIntern";

@Entity({ name: 'intern_subject' })
export class InternSubject extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    unit: number;

    @Column()
    sessions: number;
    
    @Column()
    max_students: number;
    
    @Column()
    teacher_id: number;
    
    @Column()
    department_id: number;

    @Column()
    academic_year: number;

    @Column()
    semester_id: number;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department?: Department;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'teacher_id',
        referencedColumnName: 'id'
    })
    teacher?: Teacher;

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear.id)
    @JoinColumn({
        name: 'academic_year_id',
        referencedColumnName: 'id'
    })
    academicYear?: AcademicYear;

    @ManyToOne(() => Semester, (semester) => semester.id)
    @JoinColumn({
        name: 'semester_id',
        referencedColumnName: 'id'
    })
    semester?: Semester;

    @OneToOne(() => StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.internSubject, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        name: 'id',
        referencedColumnName: 'subject_id'
    })
    studentLearnIntern?: StudentLearnIntern;
}