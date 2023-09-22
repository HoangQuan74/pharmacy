import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { CodeBase } from "./CodeBase";
import { status } from '../../common/constants/status.constant'
import { ExaminationBoard } from "./ExaminationBoard";
import { Student } from "./Student";
import { InternSubject } from "./InternSubject";

@Entity({ name: 'student_learn_intern' })
export class StudentLearnIntern extends CodeBase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    score: number;

    @Column({ default: status.processing })
    passed_status: status;

    @Column({ default: status.finished })
    regist_status: status;

    @Column()
    board_id: number;

    @Column()
    subject_id: number;

    @ManyToOne(() => ExaminationBoard, (examinationBoard) => examinationBoard.id)
    @JoinColumn({
        name: 'board_id',
        referencedColumnName: 'id'
    })
    board?: ExaminationBoard;

    @ManyToOne(() => Student, (student) => student.id)
    @JoinColumn({
        name: 'student_id',
        referencedColumnName: 'id'
    })
    student?: Student;

    @OneToOne(() => InternSubject, (internSubject) => internSubject.id)
    @JoinColumn({
        name: 'subject_id',
        referencedColumnName: 'id'
    })
    internSubject?: InternSubject;
}