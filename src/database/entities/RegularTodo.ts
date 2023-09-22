import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Department } from "./Department";
import { Teacher } from "./Teacher";
import { Student } from "./Student";
import { DetailConversation } from "./DetailConversation";
import { DetailTodo } from "./DetailTodo";

@Entity({ name: 'regular_todo' })
export class RegularTodo extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    teacher_id: number;

    @ManyToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'teacher_id',
        referencedColumnName: 'id'
    })
    teacher?: Teacher;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @OneToMany(() => DetailTodo, (detailTodo) => detailTodo.regularTodo)
    detailTodo?: DetailTodo[];
}