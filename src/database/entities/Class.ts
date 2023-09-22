import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";

@Entity({ name: 'class' })
export class Class extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 50 })
    class_name: string;

    @Column()
    students: number;

    @Column()
    academic_year: number;

    @Column()
    head_teacher: number;

    @Column()
    department_id: number;

    @ManyToOne(() => Department, (department) => department.id)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department?: Department;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'head_teacher',
        referencedColumnName: 'id'
    })
    teacher?: Teacher;

    @OneToMany(() => Student, (student) => student.program)
    student: Student[];
}