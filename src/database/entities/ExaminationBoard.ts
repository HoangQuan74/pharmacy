import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { AcademicYear } from "./AcademicYear";
import { Semester } from "./Semester";
import { StudentLearnIntern } from "./StudentLearnIntern";

@Entity({ name: 'examination_board' })
export class ExaminationBoard extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    president: number;

    @Column()
    secretary: number;

    @Column()
    asker: number;

    @Column()
    academic_year: number;

    @Column()
    semester_id: number;

    @Column()
    department_id: number;

    @Column({ nullable: true })
    reporting_date: Date;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'president',
        referencedColumnName: 'id'
    })
    President?: Teacher;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'secretary',
        referencedColumnName: 'id'
    })
    Secretary?: Teacher;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'asker',
        referencedColumnName: 'id'
    })
    Asker?: Teacher;

    @ManyToOne(() => AcademicYear, (academicYear) => academicYear.id)
    @JoinColumn({
        name: 'academic_year',
        referencedColumnName: 'id'
    })
    academicYear?: AcademicYear;

    @ManyToOne(() => Semester, (semester) => semester.id)
    @JoinColumn({
        name: 'semester_id',
        referencedColumnName: 'id'
    })
    semester?: Semester;

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department?: Department;

    @OneToMany(() => StudentLearnIntern, (studentLearnIntern) => studentLearnIntern.board)
    studentLearnIntern?: StudentLearnIntern[];
}