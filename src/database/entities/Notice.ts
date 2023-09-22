import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";
import { Student } from "./Student";
import { Administrator } from "./Administrator";
import { DetailNotice } from "./DetailNotice";

@Entity({ name: 'notice' })
export class Notice extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    admin_id: number;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @ManyToOne(() => Administrator, (administrator) => administrator.id)
    @JoinColumn({
        name: 'admin_id',
        referencedColumnName: 'id'
    })
    administrator?: Administrator;

    @OneToMany(() => DetailNotice, (detailNotice) => detailNotice.notice)
    detailNotice?: DetailNotice[];
}