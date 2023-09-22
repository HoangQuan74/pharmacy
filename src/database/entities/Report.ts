import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { Student } from "./Student";

@Entity({ name: 'report' })
export class Report extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column({ type: 'longblob'})
    report_file: string;

    @Column({ type: 'longblob'})
    result_business_file: string;

    @Column({ type: 'longblob'})
    result_teacher_file: string;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;
}