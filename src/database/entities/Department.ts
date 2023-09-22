import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { School } from "./School";
import { Major } from "./Major";
import { Class } from "./Class";
import { Teacher } from "./Teacher";
import { InternSubject } from "./InternSubject";
import { ExaminationBoard } from "./ExaminationBoard";

@Entity({ name: 'department' })
export class Department extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'nvarchar', length: 50 })
    department_name: string;

    @Column({ nullable: true })
    department_head: number;

    @Column()
    school_id: number;

    @ManyToOne(() => School, (school) => school.id)
    @JoinColumn({
        name: 'school_id',
        referencedColumnName: 'id'
    })
    school?: School;

    @OneToMany(() => Major, (major) => major.department)
    major?: Major[];

    @OneToMany(() => Class, (Class) => Class.department)
    class?: Class[];

    @OneToOne(() => Teacher, (teacher) => teacher.id)
    @JoinColumn({
        name: 'department_head',
        referencedColumnName: 'id', 
    })
    teacher?: Teacher;

    @OneToMany(() => InternSubject, (internSubject) => internSubject.department)
    intern_subject?: InternSubject[];

    @OneToMany(() => ExaminationBoard, (examinationBoard) => examinationBoard.department)
    examinationBoard?: ExaminationBoard[];
}